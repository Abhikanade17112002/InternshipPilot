
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

const getColor = (value) => {
  if (value >= 55) return "#22c55e"; // green
  if (value >= 40) return "#eab308"; // yellow
  return "#ef4444"; // red
};

const getIcon = (value) => {
// In your component's getIcon function:
if (value >= 75) return <CheckCircle data-testid="check-circle-icon" size={24} className="text-green-500" />;
if (value >= 50) return <AlertTriangle data-testid="alert-triangle-icon" size={24} className="text-yellow-500" />;
return <XCircle data-testid="x-circle-icon" size={24} className="text-red-500" />;
};

const EvaluateResultDialogBox = ({
  score,
  content_score,
  keyword_score,
  missing_keywords,
  skillGapAnalysis
}) => {

    const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 font-bold text-white hover:bg-green-700 transition">
          View Result 📊
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[60vw] max-h-[90vh] overflow-y-auto rounded-2xl p-6 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-green-700">
            Resume Evaluation Summary
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here's how your resume scored and areas to improve.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-6 text-sm">
          {/* Score Circles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              ["Content Score", content_score],
              ["Keyword Score", keyword_score],
              ["ATS Score", score],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-4 rounded-xl shadow-md flex flex-col items-center"
                data-tip={`${label}: ${Number(value?.toFixed(2))}%`}
              >
                <div className="w-24 h-24">
                  <CircularProgressbarWithChildren
                    value={Number(value?.toFixed(2))}
                    styles={buildStyles({
                      pathColor: getColor(Number(value?.toFixed(2))),
                      trailColor: "#e5e7eb",
                    })}
                  >
                    <div className="flex flex-col items-center justify-center">
                      {getIcon(Number(value?.toFixed(2)))}
                      <div className="text-sm font-bold text-gray-800 mt-1">
                        {Number(value?.toFixed(2))}%
                      </div>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
                <p className="mt-3 font-medium text-gray-600">{label}</p>
              </div>
            ))}
          </div>

          {/* Tooltips */}
          <ReactTooltip place="top" type="dark" effect="solid" />

          {/* Missing Keywords */}
          <div>
            <h3 className="font-semibold text-base mb-2 text-gray-800">🚫 Missing Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {missing_keywords?.map((keyword, index) => (
                <Badge variant="secondary" key={index} className="px-3 py-1 text-sm rounded-full">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h3 className="font-semibold text-base mb-2 text-gray-800">📋 Suggestions</h3>
            <p className="leading-relaxed text-gray-700">{skillGapAnalysis}</p>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <Button onClick={() => setIsOpen(false)} type="button" className="bg-green-600 text-white hover:bg-green-700 transition">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EvaluateResultDialogBox;

