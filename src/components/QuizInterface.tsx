
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Brain, ArrowRight, RotateCcw } from 'lucide-react';

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);

  // Mock quiz data
  const quizData = [
    {
      id: 1,
      subject: '운영체제',
      question: '프로세스(Process)와 스레드(Thread)의 가장 중요한 차이점은 무엇인가요?',
      options: [
        '프로세스는 운영체제가, 스레드는 프로그래머가 관리한다',
        '프로세스는 독립적인 메모리 공간을 가지지만, 스레드는 메모리 공간을 공유한다',
        '프로세스는 CPU를 사용하지만, 스레드는 메모리만 사용한다',
        '프로세스와 스레드는 본질적으로 동일하다'
      ],
      correctAnswer: 1,
      explanation: '프로세스는 각자 독립적인 메모리 공간(코드, 데이터, 힙, 스택)을 가지지만, 스레드는 같은 프로세스 내에서 코드, 데이터, 힙 영역을 공유하고 스택만 독립적으로 가집니다.'
    },
    {
      id: 2,
      subject: '운영체제',
      question: '데드락(Deadlock)이 발생하기 위한 4가지 필요조건이 아닌 것은?',
      options: [
        '상호 배제(Mutual Exclusion)',
        '점유와 대기(Hold and Wait)',
        '선점 불가(No Preemption)',
        '우선순위 역전(Priority Inversion)'
      ],
      correctAnswer: 3,
      explanation: '데드락의 4가지 필요조건은 상호배제, 점유와 대기, 선점 불가, 순환 대기입니다. 우선순위 역전은 데드락의 필요조건이 아닙니다.'
    },
    {
      id: 3,
      subject: '데이터베이스',
      question: '데이터베이스 정규화에서 제1정규형(1NF)의 조건은 무엇인가요?',
      options: [
        '모든 속성이 원자값(Atomic Value)이어야 한다',
        '부분 함수 종속을 제거해야 한다',
        '이행 함수 종속을 제거해야 한다',
        '다치 종속을 제거해야 한다'
      ],
      correctAnswer: 0,
      explanation: '제1정규형(1NF)의 조건은 모든 속성이 원자값이어야 한다는 것입니다. 즉, 각 칼럼에는 더 이상 분해할 수 없는 단일 값만 저장되어야 합니다.'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (answerIndex === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
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

  const currentQ = quizData[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correctAnswer;
  const isLastQuestion = currentQuestion === quizData.length - 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">문제 풀이</h2>
        <p className="text-lg text-gray-600">CS 핵심 개념을 확인해보세요</p>
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
              {currentQuestion + 1}/{quizData.length}
            </Badge>
          </div>
          <Progress value={((currentQuestion + 1) / quizData.length) * 100} className="h-3" />
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
            {currentQ.options.map((option, index) => (
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
                {score}/{quizData.length}
              </div>
              <div className="text-lg text-gray-600">
                정답률: {Math.round((score / quizData.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">
                {score === quizData.length ? '완벽합니다! 🎉' : 
                 score >= quizData.length * 0.8 ? '잘하고 있어요! 👏' : 
                 '조금 더 복습해보세요! 💪'}
              </div>
              <Button 
                onClick={resetQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                다시 풀기
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizInterface;
