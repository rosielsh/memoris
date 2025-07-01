
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Brain, ArrowRight, RotateCcw, BookOpen } from 'lucide-react';

interface Subject {
  id: number;
  name: string;
  progress: number;
  nextReview: string;
  totalQuestions: number;
  correctRate: number;
  color: string;
}

interface QuizInterfaceProps {
  subjects: Subject[];
}

const QuizInterface = ({ subjects }: QuizInterfaceProps) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);

  // Mock quiz data by subject - diverse topics for all professions
  const quizData: { [key: string]: any[] } = {
    '마케팅 전략': [
      {
        id: 1,
        subject: '마케팅 전략',
        question: '4P 마케팅 믹스에 포함되지 않는 요소는 무엇인가요?',
        options: [
          'Product (제품)',
          'Price (가격)',
          'Promotion (촉진)',
          'People (사람)'
        ],
        correctAnswer: 3,
        explanation: '전통적인 4P 마케팅 믹스는 Product(제품), Price(가격), Place(유통), Promotion(촉진)으로 구성됩니다. People은 7P 확장 모델에 포함되는 요소입니다.'
      },
      {
        id: 2,
        subject: '마케팅 전략',
        question: 'SWOT 분석에서 S는 무엇을 의미하나요?',
        options: [
          'Strategy (전략)',
          'Strength (강점)',
          'Service (서비스)',
          'Sales (판매)'
        ],
        correctAnswer: 1,
        explanation: 'SWOT 분석은 Strength(강점), Weakness(약점), Opportunity(기회), Threat(위협)를 분석하는 전략 도구입니다.'
      }
    ],
    '회계원리': [
      {
        id: 1,
        subject: '회계원리',
        question: '복식부기의 기본 원리는 무엇인가요?',
        options: [
          '수입과 지출을 기록한다',
          '차변과 대변의 금액이 항상 일치한다',
          '현금만 기록한다',
          '손익만 계산한다'
        ],
        correctAnswer: 1,
        explanation: '복식부기는 모든 거래를 차변(왼쪽)과 대변(오른쪽)에 동시에 기록하며, 차변과 대변의 합계가 항상 일치해야 합니다.'
      },
      {
        id: 2,
        subject: '회계원리',
        question: '자산 = 부채 + 자본 공식에서 자산이 증가했을 때 일어날 수 있는 경우는?',
        options: [
          '부채만 증가',
          '자본만 증가',
          '부채 또는 자본이 증가',
          '부채와 자본이 모두 감소'
        ],
        correctAnswer: 2,
        explanation: '회계등식에서 자산이 증가하면 부채가 증가하거나, 자본이 증가하거나, 또는 둘 다 증가할 수 있습니다.'
      }
    ],
    '영어회화': [
      {
        id: 1,
        subject: '영어회화',
        question: '비즈니스 미팅에서 의견을 정중하게 반대할 때 적절한 표현은?',
        options: [
          'You are wrong.',
          'I disagree with you.',
          'I see your point, but I have a different perspective.',
          'That\'s not right.'
        ],
        correctAnswer: 2,
        explanation: '"I see your point, but I have a different perspective."는 상대방의 의견을 인정하면서도 정중하게 다른 관점을 제시하는 표현입니다.'
      },
      {
        id: 2,
        subject: '영어회화',
        question: '전화로 약속을 잡을 때 사용하는 표현은?',
        options: [
          'When are you free?',
          'What time do you want?',
          'Would you be available next Tuesday?',
          'Can you come tomorrow?'
        ],
        correctAnswer: 2,
        explanation: '"Would you be available...?"는 정중하고 전문적인 방식으로 상대방의 일정을 확인하는 표현입니다.'
      }
    ],
    '프로젝트 관리': [
      {
        id: 1,
        subject: '프로젝트 관리',
        question: '프로젝트 관리에서 Critical Path란 무엇인가요?',
        options: [
          '가장 비용이 많이 드는 경로',
          '가장 위험한 작업들의 순서',
          '프로젝트 완료까지 가장 오래 걸리는 작업 경로',
          '가장 중요한 이해관계자들의 목록'
        ],
        correctAnswer: 2,
        explanation: 'Critical Path(임계경로)는 프로젝트 시작부터 완료까지 가장 오래 걸리는 작업들의 연속된 경로로, 이 경로의 지연은 전체 프로젝트 지연으로 이어집니다.'
      }
    ]
  };

  const getCurrentQuizData = () => {
    if (!selectedSubject) return [];
    return quizData[selectedSubject.name] || [];
  };

  const currentQuizData = getCurrentQuizData();

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (answerIndex === currentQuizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
  };

  const backToSubjectSelection = () => {
    setSelectedSubject(null);
    resetQuiz();
  };

  if (!selectedSubject) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">문제 풀이</h2>
          <p className="text-lg text-gray-600">복습할 과목을 선택해주세요</p>
        </div>

        {/* Subject Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={() => handleSubjectSelect(subject)}
            >
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
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">학습 진도</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">총 {subject.totalQuestions}문제</span>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    문제 풀기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (currentQuizData.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">{selectedSubject.name}</h2>
          <p className="text-lg text-gray-600">아직 문제가 준비되지 않았습니다</p>
          <Button onClick={backToSubjectSelection}>
            과목 선택으로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = currentQuizData[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;
  const isLastQuestion = currentQuestion === currentQuizData.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">{selectedSubject.name}</h2>
          <p className="text-lg text-gray-600">CS 핵심 개념을 확인해보세요</p>
        </div>
        <Button variant="outline" onClick={backToSubjectSelection}>
          과목 변경
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold">진행률</span>
            </div>
            <Badge variant="secondary">
              {currentQuestion + 1}/{currentQuizData.length}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / currentQuizData.length) * 100} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{currentQuestion + 1}번째 문제</span>
            <span>점수: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {currentQ.subject}
            </Badge>
            <span className="text-sm text-gray-500">문제 {currentQ.id}</span>
          </div>
          <CardTitle className="text-xl leading-relaxed pt-4">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  showResult
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : index === selectedAnswer && index !== currentQ.correctAnswer
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                    : selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50 text-blue-800'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span>{option}</span>
                  {showResult && index === currentQ.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Result */}
          {showResult && (
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center space-x-2 mb-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span className={`font-semibold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '정답입니다!' : '틀렸습니다!'}
                </span>
              </div>
              <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={resetQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              처음부터
            </Button>
            
            {showResult && (
              <Button 
                onClick={handleNextQuestion}
                disabled={isLastQuestion}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLastQuestion ? '완료' : '다음 문제'}
                {!isLastQuestion && <ArrowRight className="w-4 h-4 ml-2" />}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Final Score */}
      {showResult && isLastQuestion && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-gray-900">
                {score}/{currentQuizData.length}
              </div>
              <div className="text-lg text-gray-600">
                정답률: {Math.round((score / currentQuizData.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">
                {score === currentQuizData.length ? '완벽합니다! 🎉' : 
                 score >= currentQuizData.length * 0.8 ? '잘하고 있어요! 👏' : 
                 '조금 더 복습해보세요! 💪'}
              </div>
              <div className="flex space-x-4 justify-center">
                <Button 
                  onClick={resetQuiz}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  다시 풀기
                </Button>
                <Button variant="outline" onClick={backToSubjectSelection}>
                  다른 과목 선택
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizInterface;
