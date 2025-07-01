
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Clock, Bell, Calendar, Plus, Edit3, Trash2 } from 'lucide-react';

const ScheduleManager = () => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      subject: '운영체제',
      time: '09:00',
      days: ['월', '수', '금'],
      enabled: true,
      questionCount: 5,
      type: 'morning'
    },
    {
      id: 2,
      subject: '데이터베이스',
      time: '15:00',
      days: ['화', '목'],
      enabled: true,
      questionCount: 3,
      type: 'afternoon'
    },
    {
      id: 3,
      subject: '네트워크 프로그래밍',
      time: '21:00',
      days: ['월', '화', '수', '목', '금'],
      enabled: false,
      questionCount: 4,
      type: 'evening'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const toggleSchedule = (id: number) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'morning':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'afternoon':
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
      case 'evening':
        return 'bg-gradient-to-r from-purple-500 to-purple-700';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'morning':
        return '🌅 아침';
      case 'afternoon':
        return '☀️ 오후';
      case 'evening':
        return '🌙 저녁';
      default:
        return '⏰ 기타';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">복습 스케줄 관리</h2>
        <p className="text-lg text-gray-600">최적의 복습 타이밍을 설정하세요</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{schedules.filter(s => s.enabled).length}</div>
            <div className="text-sm opacity-90">활성 스케줄</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {schedules.reduce((sum, s) => s.enabled ? sum + s.questionCount : sum, 0)}
            </div>
            <div className="text-sm opacity-90">일일 예상 문제</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {schedules.reduce((sum, s) => s.enabled ? sum + (s.questionCount * 1.5) : sum, 0)}분
            </div>
            <div className="text-sm opacity-90">예상 학습 시간</div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">설정된 스케줄</h3>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            새 스케줄 추가
          </Button>
        </div>

        {schedules.map((schedule) => (
          <Card key={schedule.id} className={`transition-all duration-200 ${schedule.enabled ? 'ring-2 ring-blue-200' : 'opacity-75'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${getTypeColor(schedule.type)} flex items-center justify-center text-white font-bold`}>
                    {schedule.time.split(':')[0]}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{schedule.subject}</h4>
                      <Badge variant="outline">{getTypeLabel(schedule.type)}</Badge>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{schedule.time}</span>
                      <span>•</span>
                      <span>{schedule.days.join(', ')}</span>
                      <span>•</span>
                      <span>{schedule.questionCount}문제</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Switch 
                    checked={schedule.enabled}
                    onCheckedChange={() => toggleSchedule(schedule.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Schedule Form */}
      {showAddForm && (
        <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">새 복습 스케줄 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">과목</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>운영체제</option>
                  <option>데이터베이스</option>
                  <option>네트워크 프로그래밍</option>
                  <option>소프트웨어공학</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">시간</label>
                <input 
                  type="time" 
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  defaultValue="09:00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">요일</label>
              <div className="flex flex-wrap gap-2">
                {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                  <Button 
                    key={day}
                    variant="outline" 
                    size="sm" 
                    className="w-12 h-12 rounded-full"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">문제 개수</label>
              <select className="w-full p-2 border border-gray-300 rounded-lg">
                <option value="3">3개 (약 2분)</option>
                <option value="5">5개 (약 3분)</option>
                <option value="7">7개 (약 5분)</option>
                <option value="10">10개 (약 7분)</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                취소
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                스케줄 추가
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Bell className="w-5 h-5" />
            <span>복습 스케줄 팁</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-green-700">
          <div className="flex items-start space-x-2">
            <span className="text-green-500">•</span>
            <span>아침 9시: 전날 배운 내용 확인하기 좋은 시간</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-500">•</span>
            <span>오후 3시: 점심 후 집중력이 떨어지는 시간에 간단한 복습</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-500">•</span>
            <span>저녁 9시: 하루 마무리 복습으로 장기 기억 강화</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-500">•</span>
            <span>한 번에 너무 많은 문제보다는 꾸준히 적은 문제를 푸는 것이 효과적</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManager;
