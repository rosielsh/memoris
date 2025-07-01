
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock, TrendingUp, Play } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  progress: number;
  nextReview: string;
  totalQuestions: number;
  correctRate: number;
  color: string;
}

interface SubjectCardProps {
  subject: Subject;
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${subject.color}`} />
            <CardTitle className="text-lg">{subject.name}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            {subject.correctRate}% 정답률
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">학습 진도</span>
            <span className="font-medium">{subject.progress}%</span>
          </div>
          <Progress value={subject.progress} className="h-2" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">총 {subject.totalQuestions}문제</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{subject.nextReview}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Play className="w-4 h-4 mr-2" />
            복습하기
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
