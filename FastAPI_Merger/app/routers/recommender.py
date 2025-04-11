# from fastapi import APIRouter, HTTPException, UploadFile, File
# from pydantic import BaseModel
# from typing import List, Dict, Optional
# import pandas as pd
# import numpy as np
# import json
# import spacy
# from nltk.corpus import stopwords
# from sklearn.feature_extraction.text import TfidfVectorizer
# import nltk
#
# router = APIRouter()
#
# # Download required NLTK data (ensure it is done only once in actual deployment)
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('averaged_perceptron_tagger')
#
# try:
#     nlp = spacy.load("en_core_web_sm")
# except OSError:
#     import subprocess
#     subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
#     nlp = spacy.load("en_core_web_sm")
#
#
# nlp = spacy.load("en_core_web_sm")
#
# # Data Models
# class Student(BaseModel):
#     name: str
#     skills: List[str]
#
# class Internship(BaseModel):
#     jobId:str
#     title: str
#     company: str
#     location: str
#     requirements: List[str]
#     jd: str
#
# class RecommendationRequest(BaseModel):
#     student: Student
#     internships: List[Internship]
#     top_n: Optional[int] = 15
#     min_similarity: Optional[float] = 0.07
#
# class RecommendationResponse(BaseModel):
#     recommendations: List[Dict]
#     matching_scores: Dict[str, float]
#
# # Helpers
# def extract_keywords_from_jd(jd: str) -> List[str]:
#     doc = nlp(jd.lower())
#     keywords = []
#
#     for chunk in doc.noun_chunks:
#         if chunk.text.strip() not in stopwords.words("english"):
#             keywords.append(chunk.text.strip())
#
#     relevant_entities = ["SKILL", "ORG", "PRODUCT", "GPE", "LANGUAGE"]
#     for ent in doc.ents:
#         if ent.label_ in relevant_entities:
#             keywords.append(ent.text.strip())
#
#     for token in doc:
#         if token.pos_ == "VERB" and token.text not in stopwords.words("english"):
#             keywords.append(token.text)
#
#     return list(set(keywords))
#
# def calculate_skill_match_score(student_skills, internship_reqs, jd_keywords) -> Dict:
#     student_skills_set = set(student_skills)
#     requirements_set = set(internship_reqs)
#     jd_keywords_set = set(jd_keywords)
#
#     direct_matches = student_skills_set & requirements_set
#     keyword_matches = student_skills_set & jd_keywords_set
#
#     return {
#         "direct_match_score": len(direct_matches) / len(requirements_set) if requirements_set else 0,
#         "keyword_match_score": len(keyword_matches) / len(jd_keywords_set) if jd_keywords_set else 0,
#         "direct_matches": list(direct_matches),
#         "keyword_matches": list(keyword_matches),
#     }
#
# # Endpoints
# @router.post("/recommend", response_model=RecommendationResponse)
# async def get_recommendations(request: RecommendationRequest):
#     try:
#         internships_data = []
#         for internship in request.internships:
#             jd_keywords = extract_keywords_from_jd(internship.jd)
#             internships_data.append({
#                 'jobId': internship.jobId,
#                 "title": internship.title,
#                 "company": internship.company,
#                 "location": internship.location,
#                 "requirements": " ".join(internship.requirements),
#                 "jd_keywords": jd_keywords,
#                 "combined_text": f"{' '.join(internship.requirements)} {' '.join(jd_keywords)}"
#             })
#
#         internships_df = pd.DataFrame(internships_data)
#
#         vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=5000)
#         internship_vectors = vectorizer.fit_transform(internships_df["combined_text"])
#         student_vector = vectorizer.transform([" ".join(request.student.skills)])
#
#         similarity_scores = np.asarray(student_vector.dot(internship_vectors.T).todense())[0]
#         top_indices = (-similarity_scores).argsort()[:request.top_n]
#
#         recommendations = []
#         for idx in top_indices:
#             if similarity_scores[idx] >= request.min_similarity:
#                 internship = internships_df.iloc[idx]
#                 skill_matches = calculate_skill_match_score(
#                     request.student.skills,
#                     internship["requirements"].split(),
#                     internship["jd_keywords"]
#                 )
#
#                 final_score = (
#                     similarity_scores[idx] * 0.4 +
#                     skill_matches["direct_match_score"] * 0.4 +
#                     skill_matches["keyword_match_score"] * 0.2
#                 )
#
#                 recommendations.append({
#                     'jobId': internship['jobId'],
#                     "title": internship["title"],
#                     "company": internship["company"],
#                     "location": internship["location"],
#                     "similarity_score": float(final_score),
#                     "tfidf_similarity": float(similarity_scores[idx]),
#                     "direct_match_score": skill_matches["direct_match_score"],
#                     "keyword_match_score": skill_matches["keyword_match_score"],
#                     "direct_matches": skill_matches["direct_matches"],
#                     "keyword_matches": skill_matches["keyword_matches"]
#                 })
#
#         return {
#             "recommendations": recommendations,
#             "matching_scores": {
#                 "overall_match": float(np.mean([r['similarity_score'] for r in recommendations])) if recommendations else 0,
#                 "skill_match": float(np.mean([r['direct_match_score'] for r in recommendations])) if recommendations else 0,
#                 "keyword_match": float(np.mean([r['keyword_match_score'] for r in recommendations])) if recommendations else 0
#             }
#         }
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
#
# @router.post("/upload-internships/")
# async def upload_internships(file: UploadFile = File(...)):
#     try:
#         contents = await file.read()
#         internships = json.loads(contents)
#         return {"message": f"Successfully loaded {len(internships)} internships"}
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))
# # Job Recommendation routes




from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import List, Dict, Optional
import pandas as pd
import numpy as np
import json
import spacy
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
import nltk
import re

router = APIRouter()

# Download required NLTK data
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")


SYNONYM_MAP = {
    # ==== FRONTEND ====
    "reactjs": "react", "react.js": "react", "react-js": "react", "react native": "react-native", "reactnative": "react-native",
    "angularjs": "angular", "angular.js": "angular", "angular-js": "angular",
    "vuejs": "vue", "vue.js": "vue", "vue-js": "vue",
    "javascript": "js", "java script": "js", "jscript": "js", "ecmascript": "js",
    "html5": "html", "html 5": "html",
    "css3": "css", "css 3": "css",
    "tailwindcss": "tailwind", "tailwind css": "tailwind",
    "bootstrap5": "bootstrap", "bootstrap 4": "bootstrap", "bootstrap4": "bootstrap",
    "sveltejs": "svelte", "svelte.js": "svelte",
    "nextjs": "next.js", "next js": "next.js",
    "nuxtjs": "nuxt.js", "nuxt js": "nuxt.js",

    # ==== BACKEND ====
    "nodejs": "node", "node.js": "node", "node-js": "node",
    "expressjs": "express", "express.js": "express", "express-js": "express",
    "flask": "python", "django": "python", "fastapi": "python",
    "springboot": "spring boot", "spring-boot": "spring boot", "springmvc": "spring", "spring mvc": "spring",
    "restful": "restapi", "rest api": "restapi", "restful api": "restapi",
    "graphql": "api", "grpc": "api", "soap": "api",
    "php": "php", "laravel": "php", "codeigniter": "php", "symfony": "php",

    # ==== DATABASES ====
    "mongo": "mongodb", "mongo.db": "mongodb", "mongoose": "mongodb",
    "postgres": "sql", "postgresql": "sql", "postgre": "sql",
    "mysql": "sql", "sqlite": "sql", "sqlite3": "sql", "mariadb": "sql",
    "firebase": "nosql", "firestore": "nosql", "realtime database": "nosql",
    "dynamodb": "nosql", "couchdb": "nosql", "cassandra": "nosql",
    "redis": "cache", "memcached": "cache",
    "bigquery": "datawarehouse", "snowflake": "datawarehouse", "redshift": "datawarehouse",

    # ==== LANGUAGES ====
    "py": "python", "python3": "python", "python 3": "python",
    "typescript": "ts",
    "csharp": "c#", "c-sharp": "c#", "dotnet": ".net", ".net core": ".net",
    "java8": "java", "java 8": "java", "java se": "java",
    "golang": "go", "go lang": "go", "go language": "go",
    "kotlin": "kotlin", "dartlang": "dart",
    "bash": "shell", "shell script": "shell", "zsh": "shell",

    # ==== DEVOPS ====
    "dockerize": "docker", "containerization": "docker",
    "kubernetes": "k8s", "k8": "k8s", "helm": "k8s", "minikube": "k8s",
    "ci/cd": "devops", "ci cd": "devops", "pipeline": "devops", "build automation": "devops",
    "github actions": "devops", "gitlab ci": "devops", "circleci": "devops", "jenkins": "devops",
    "ansible": "infrastructure", "terraform": "infrastructure", "cloudformation": "infrastructure",
    "prometheus": "monitoring", "grafana": "monitoring", "newrelic": "monitoring", "datadog": "monitoring",

    # ==== CLOUD ====
    "aws": "cloud", "amazon web services": "cloud",
    "azure": "cloud", "microsoft azure": "cloud",
    "gcp": "cloud", "google cloud": "cloud",
    "ibm cloud": "cloud", "oracle cloud": "cloud",
    "cloud functions": "serverless", "lambda": "serverless", "firebase functions": "serverless",

    # ==== DATA/ML/AI ====
    "machine learning": "ml", "deep learning": "ml", "neural networks": "ml",
    "scikit-learn": "ml", "sklearn": "ml", "tensorflow": "ml", "keras": "ml", "pytorch": "ml",
    "pandas": "data", "numpy": "data", "matplotlib": "data", "seaborn": "data", "plotly": "data",
    "spark": "bigdata", "hadoop": "bigdata", "hive": "bigdata",
    "nlp": "ai", "natural language processing": "ai", "computer vision": "ai",
    "generative ai": "ai", "llm": "ai", "chatgpt": "ai", "openai": "ai",

    # ==== SECURITY ====
    "jwt": "authentication", "oauth": "authentication", "sso": "authentication",
    "bcrypt": "encryption", "hashing": "encryption", "cryptography": "encryption",
    "ssl": "security", "tls": "security", "xss": "security", "csrf": "security",

    # ==== MOBILE ====
    "reactnative": "react native", "react-native": "react native",
    "flutter": "flutter", "dart": "dart", "android dev": "android", "android studio": "android",
    "swift": "ios", "objective-c": "ios", "xcode": "ios",

    # ==== TESTING ====
    "jestjs": "jest", "jest.js": "jest", "mocha.js": "mocha", "mochajs": "mocha",
    "cypress.io": "cypress", "cypress testing": "cypress", "playwright": "testing",
    "selenium": "testing", "testng": "testing", "junit": "testing",
    "postman": "api testing", "swagger": "api testing",

    # ==== TOOLS / PLATFORM ====
    "github": "git", "gitlab": "git", "bitbucket": "git", "vcs": "git",
    "jira": "management", "trello": "management", "notion": "management", "confluence": "management",
    "vscode": "ide", "intellij": "ide", "pycharm": "ide", "eclipse": "ide",
    "figma": "design", "adobe xd": "design", "zeplin": "design",

    # ==== METHODOLOGIES ====
    "agile methodology": "agile", "scrum framework": "scrum", "kanban board": "kanban",
    "test driven development": "tdd", "behavior driven development": "bdd",

    # ==== OTHERS ====
    "etl": "data pipeline", "data ingestion": "data pipeline",
    "csv": "data", "excel": "data", "xlsx": "data",
    "json": "data", "xml": "data",
    "oauth2": "authentication", "openid": "authentication",
    "linux": "os", "ubuntu": "os", "windows server": "os", "macos": "os",
}

# Utility: Normalize and Map Skill
def normalize_skill(skill: str) -> str:
    skill = skill.strip().lower()
    skill = re.sub(r"[^\w\s]", "", skill)
    return SYNONYM_MAP.get(skill, skill)


def preprocess_skills(skills: List[str]) -> List[str]:
    return list(set([normalize_skill(skill) for skill in skills if skill.strip()]))


# Data Models
class Student(BaseModel):
    name: str
    skills: List[str]


class Internship(BaseModel):
    jobId: str
    title: str
    company: str
    location: str
    requirements: List[str]
    jd: str


class RecommendationRequest(BaseModel):
    student: Student
    internships: List[Internship]
    top_n: Optional[int] = 15
    min_similarity: Optional[float] = 0.09


class RecommendationResponse(BaseModel):
    recommendations: List[Dict]
    matching_scores: Dict[str, float]


# Keyword Extraction from JD
def extract_keywords_from_jd(jd: str) -> List[str]:
    doc = nlp(jd.lower())
    keywords = []

    for chunk in doc.noun_chunks:
        if chunk.text.strip() not in stopwords.words("english"):
            keywords.append(chunk.text.strip())

    relevant_entities = ["SKILL", "ORG", "PRODUCT", "GPE", "LANGUAGE"]
    for ent in doc.ents:
        if ent.label_ in relevant_entities:
            keywords.append(ent.text.strip())

    for token in doc:
        if token.pos_ == "VERB" and token.text not in stopwords.words("english"):
            keywords.append(token.text)

    return preprocess_skills(keywords)


# Skill Match Scoring
def calculate_skill_match_score(student_skills, internship_reqs, jd_keywords) -> Dict:
    student_set = set(student_skills)
    req_set = set(internship_reqs)
    keyword_set = set(jd_keywords)

    direct_matches = student_set & req_set
    keyword_matches = student_set & keyword_set

    return {
        "direct_match_score": len(direct_matches) / len(req_set) if req_set else 0,
        "keyword_match_score": len(keyword_matches) / len(keyword_set) if keyword_set else 0,
        "direct_matches": list(direct_matches),
        "keyword_matches": list(keyword_matches),
    }


# Recommendation Endpoint
@router.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    try:
        student_skills = preprocess_skills(request.student.skills)
        internships_data = []

        for internship in request.internships:
            normalized_reqs = preprocess_skills(internship.requirements)
            jd_keywords = extract_keywords_from_jd(internship.jd)

            internships_data.append({
                'jobId': internship.jobId,
                "title": internship.title,
                "company": internship.company,
                "location": internship.location,
                "requirements": " ".join(normalized_reqs),
                "jd_keywords": jd_keywords,
                "combined_text": f"{' '.join(normalized_reqs)} {' '.join(jd_keywords)}"
            })

        internships_df = pd.DataFrame(internships_data)

        vectorizer = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), max_features=5000)
        internship_vectors = vectorizer.fit_transform(internships_df["combined_text"])
        student_vector = vectorizer.transform([" ".join(student_skills)])

        similarity_scores = np.asarray(student_vector.dot(internship_vectors.T).todense())[0]
        top_indices = (-similarity_scores).argsort()[:request.top_n]

        recommendations = []
        for idx in top_indices:
            if similarity_scores[idx] >= request.min_similarity:
                internship = internships_df.iloc[idx]

                skill_matches = calculate_skill_match_score(
                    student_skills,
                    internship["requirements"].split(),
                    internship["jd_keywords"]
                )

                final_score = (
                    similarity_scores[idx] * 0.3 +
                    skill_matches["direct_match_score"] * 0.5 +
                    skill_matches["keyword_match_score"] * 0.2
                )

                recommendations.append({
                    'jobId': internship['jobId'],
                    "title": internship["title"],
                    "company": internship["company"],
                    "location": internship["location"],
                    "similarity_score": float(final_score),
                    "tfidf_similarity": float(similarity_scores[idx]),
                    "direct_match_score": skill_matches["direct_match_score"],
                    "keyword_match_score": skill_matches["keyword_match_score"],
                    "direct_matches": skill_matches["direct_matches"],
                    "keyword_matches": skill_matches["keyword_matches"]
                })

        return {
            "recommendations": recommendations,
            "matching_scores": {
                "overall_match": float(np.mean([r['similarity_score'] for r in recommendations])) if recommendations else 0,
                "skill_match": float(np.mean([r['direct_match_score'] for r in recommendations])) if recommendations else 0,
                "keyword_match": float(np.mean([r['keyword_match_score'] for r in recommendations])) if recommendations else 0
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Internship JSON File Upload Endpoint
@router.post("/upload-internships/")
async def upload_internships(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        internships = json.loads(contents)
        return {"message": f"Successfully loaded {len(internships)} internships"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
