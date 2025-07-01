
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, Clock, TrendingUp, Plus, Bell, Target, Award } from 'lucide-react';
import SubjectCard from '@/components/SubjectCard';
import QuizInterface from '@/components/QuizInterface';
import ScheduleManager from '@/components/ScheduleManager';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data for demonstration
  const subjects = [
    {
      id: 1,
      name: '운영체제',
      progress: 75,
      nextReview: '오늘 오후 3시',
      totalQuestions: 45,
      correctRate: 82,
      color: 'bg-gradient-to-r from-blue-500 to-purple-600'
    },
    {
      id: 2,
      name: '데이터베이스',
      progress: 60,
      nextReview: '내일 오전 9시',
      totalQuestions: 38,
      correctRate: 78,
      color: 'bg-gradient-to-r from-green-500 to-teal-600'
    },
    {
      id: 3,
      name: '네트워크 프로그래밍',
      progress: 45,
      nextReview: '오늘 오후 7시',
      totalQuestions: 52,
      correctRate: 65,
      color: 'bg-gradient-to-r from-orange-500 to-red-600'
    },
    {
      id: 4,
      name: '소프트웨어공학',
      progress: 30,
      nextReview: '내일 오후 2시',
      totalQuestions: 29,
      correctRate: 70,
      color: 'bg-gradient-to-r from-purple-500 to-pink-600'
    }
  ];

  const todayStats = {
    questionsAnswered: 12,
    correctAnswers: 9,
    studyTime: '25분',
    streak: 7
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">스마트 복습</h1>
            </div>
            
            <nav className="flex space-x-1">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('dashboard')}
                className="px-4 py-2"
              >
                대시보드
              </Button>
              <Button
                variant={activeTab === 'quiz' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('quiz')}
                className="px-4 py-2"
              >
                문제 풀이
              </Button>
              <Button
                variant={activeTab === 'schedule' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('schedule')}
                className="px-4 py-2"
              >
                스케줄
              </Button>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                알림
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                행
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">안녕하세요, 행성님! 👋</h2>
              <p className="text-lg text-gray-600">오늘도 꾸준한 복습으로 CS 지식을 쌓아보세요</p>
            </div>

            {/* Today's Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">오늘 푼 문제</p>
                      <p className="text-2xl font-bold">{todayStats.questionsAnswered}개</p>
                    </div>
                    <Target className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">정답률</p>
                      <p className="text-2xl font-bold">{Math.round((todayStats.correctAnswers / todayStats.questionsAnswered) * 100)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">학습 시간</p>
                      <p className="text-2xl font-bold">{todayStats.studyTime}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">연속 학습</p>
                      <p className="text-2xl font-bold">{todayStats.streak}일</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>빠른 시작</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="p-6 h-auto flex-col space-y-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={() => setActiveTab('quiz')}
                  >
                    <Brain className="w-6 h-6" />
                    <span>바로 문제 풀기</span>
                    <span className="text-xs opacity-90">3분 소요</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="p-6 h-auto flex-col space-y-2 border-2 hover:bg-blue-50"
                  >
                    <Plus className="w-6 h-6" />
                    <span>새 과목 추가</span>
                    <span className="text-xs text-gray-500">노션 연동</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="p-6 h-auto flex-col space-y-2 border-2 hover:bg-purple-50"
                    onClick={() => setActiveTab('schedule')}
                  >
                    <Clock className="w-6 h-6" />
                    <span>복습 스케줄</span>
                    <span className="text-xs text-gray-500">알림 설정</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Subjects Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900">수강 과목</h3>
                <Badge variant="secondary" className="text-sm">
                  총 {subjects.length}과목
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && <QuizInterface />}
        {activeTab === 'schedule' && <ScheduleManager />}
      </main>
    </div>
  );
};

export default Index;
