import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Sprint {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  goals: string[];
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
  };
  team: string[];
}

const Sprints = () => {
  const navigate = useNavigate();
  const [sprints] = useState<Sprint[]>([
    {
      id: '1',
      name: 'Спринт 1: MVP разработка',
      status: 'active',
      startDate: '2024-10-21',
      endDate: '2024-11-04',
      goals: [
        'Создать основную архитектуру проекта',
        'Разработать главную страницу',
        'Настроить CI/CD pipeline'
      ],
      tasks: {
        total: 12,
        completed: 7,
        inProgress: 3
      },
      team: ['АИ', 'МП', 'ДК']
    },
    {
      id: '2',
      name: 'Спринт 2: Функциональность',
      status: 'planning',
      startDate: '2024-11-05',
      endDate: '2024-11-19',
      goals: [
        'Добавить систему уведомлений',
        'Реализовать поиск и фильтры',
        'Мобильная адаптация'
      ],
      tasks: {
        total: 15,
        completed: 0,
        inProgress: 0
      },
      team: ['АИ', 'МП']
    },
    {
      id: '3',
      name: 'Спринт 0: Подготовка',
      status: 'completed',
      startDate: '2024-10-07',
      endDate: '2024-10-20',
      goals: [
        'Провести планирование проекта',
        'Настроить рабочее окружение',
        'Создать дизайн-систему'
      ],
      tasks: {
        total: 8,
        completed: 8,
        inProgress: 0
      },
      team: ['АИ', 'МП', 'ДК', 'ЕС']
    }
  ]);

  const getStatusColor = (status: Sprint['status']) => {
    switch (status) {
      case 'planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getStatusLabel = (status: Sprint['status']) => {
    switch (status) {
      case 'planning': return 'Планирование';
      case 'active': return 'Активный';
      case 'completed': return 'Завершен';
    }
  };

  const getStatusIcon = (status: Sprint['status']) => {
    switch (status) {
      case 'planning': return 'Calendar';
      case 'active': return 'Play';
      case 'completed': return 'CheckCircle2';
    }
  };

  const calculateProgress = (sprint: Sprint) => {
    return Math.round((sprint.tasks.completed / sprint.tasks.total) * 100);
  };

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const activeSprints = sprints.filter(s => s.status === 'active');
  const planningSprints = sprints.filter(s => s.status === 'planning');
  const completedSprints = sprints.filter(s => s.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow CRM
          </h1>
        </div>
        
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
            <Icon name="LayoutDashboard" className="mr-2" size={20} />
            Дашборд
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="KanbanSquare" className="mr-2" size={20} />
            Канбан
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/tasks')}>
            <Icon name="ListTodo" className="mr-2" size={20} />
            Задачи
          </Button>
          <Button variant="default" className="w-full justify-start" onClick={() => navigate('/sprints')}>
            <Icon name="Timer" className="mr-2" size={20} />
            Спринты
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/team')}>
            <Icon name="Users" className="mr-2" size={20} />
            Команда
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/settings')}>
            <Icon name="Settings" className="mr-2" size={20} />
            Настройки
          </Button>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Спринты</h2>
            <p className="text-muted-foreground">Управление спринтами и итерациями проекта</p>
          </div>
          
          <Button>
            <Icon name="Plus" className="mr-2" size={20} />
            Создать спринт
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-card border-blue-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Активные</span>
              <Icon name="Play" size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold">{activeSprints.length}</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-card border-yellow-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Планируются</span>
              <Icon name="Calendar" size={20} className="text-yellow-400" />
            </div>
            <div className="text-3xl font-bold">{planningSprints.length}</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-card border-green-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Завершено</span>
              <Icon name="CheckCircle2" size={20} className="text-green-400" />
            </div>
            <div className="text-3xl font-bold">{completedSprints.length}</div>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Активные ({activeSprints.length})</TabsTrigger>
            <TabsTrigger value="planning">Планирование ({planningSprints.length})</TabsTrigger>
            <TabsTrigger value="completed">Завершенные ({completedSprints.length})</TabsTrigger>
            <TabsTrigger value="timeline">Таймлайн</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 animate-fade-in">
            {activeSprints.map((sprint) => (
              <Card key={sprint.id} className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{sprint.name}</h3>
                      <Badge variant="outline" className={getStatusColor(sprint.status)}>
                        <Icon name={getStatusIcon(sprint.status)} size={12} className="mr-1" />
                        {getStatusLabel(sprint.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>{new Date(sprint.startDate).toLocaleDateString('ru-RU')} - {new Date(sprint.endDate).toLocaleDateString('ru-RU')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>Осталось {calculateDaysLeft(sprint.endDate)} дней</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex -space-x-2">
                    {sprint.team.map((member, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs bg-primary/20">{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Прогресс</span>
                    <span className="font-medium">{sprint.tasks.completed} из {sprint.tasks.total} задач</span>
                  </div>
                  <Progress value={calculateProgress(sprint)} className="h-2" />
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground">Цели спринта:</h4>
                  <ul className="space-y-1">
                    {sprint.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Icon name="Target" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {sprint.tasks.completed} завершено
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      {sprint.tasks.inProgress} в работе
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-500/20 text-gray-400">
                      {sprint.tasks.total - sprint.tasks.completed - sprint.tasks.inProgress} новых
                    </Badge>
                  </div>

                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Eye" size={16} className="mr-2" />
                      Детали
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="planning" className="space-y-4 animate-fade-in">
            {planningSprints.map((sprint) => (
              <Card key={sprint.id} className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{sprint.name}</h3>
                      <Badge variant="outline" className={getStatusColor(sprint.status)}>
                        <Icon name={getStatusIcon(sprint.status)} size={12} className="mr-1" />
                        {getStatusLabel(sprint.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>Начало: {new Date(sprint.startDate).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex -space-x-2">
                    {sprint.team.map((member, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs bg-primary/20">{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-muted-foreground">Запланированные цели:</h4>
                  <ul className="space-y-1">
                    {sprint.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Icon name="Target" size={16} className="mt-0.5 text-primary flex-shrink-0" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <Button variant="default" size="sm">
                    <Icon name="Play" size={16} className="mr-2" />
                    Начать спринт
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 animate-fade-in">
            {completedSprints.map((sprint) => (
              <Card key={sprint.id} className="p-6 bg-card/50 border-border/50 opacity-80">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{sprint.name}</h3>
                      <Badge variant="outline" className={getStatusColor(sprint.status)}>
                        <Icon name={getStatusIcon(sprint.status)} size={12} className="mr-1" />
                        {getStatusLabel(sprint.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={16} />
                        <span>{new Date(sprint.startDate).toLocaleDateString('ru-RU')} - {new Date(sprint.endDate).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex -space-x-2">
                    {sprint.team.map((member, i) => (
                      <Avatar key={i} className="h-8 w-8 border-2 border-background">
                        <AvatarFallback className="text-xs bg-primary/20">{member}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Результат</span>
                    <span className="font-medium text-green-400">{sprint.tasks.completed}/{sprint.tasks.total} задач завершено</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>

                <Button variant="ghost" size="sm" className="mt-2">
                  <Icon name="Eye" size={16} className="mr-2" />
                  Посмотреть отчет
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="timeline" className="animate-fade-in">
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-xl font-bold mb-6">Таймлайн спринтов</h3>
              
              <div className="relative space-y-8">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                
                {[...sprints].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map((sprint, index) => (
                  <div key={sprint.id} className="relative flex gap-6">
                    <div className={`absolute left-8 w-4 h-4 rounded-full -translate-x-1/2 ${
                      sprint.status === 'active' ? 'bg-blue-500' : 
                      sprint.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                    } ring-4 ring-background`}></div>
                    
                    <div className="ml-16 flex-1">
                      <Card className="p-4 bg-muted/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{sprint.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {new Date(sprint.startDate).toLocaleDateString('ru-RU')} - {new Date(sprint.endDate).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(sprint.status)}>
                            {getStatusLabel(sprint.status)}
                          </Badge>
                        </div>
                        
                        {sprint.status !== 'planning' && (
                          <div className="mt-3">
                            <Progress value={calculateProgress(sprint)} className="h-1.5" />
                            <p className="text-xs text-muted-foreground mt-1">
                              {sprint.tasks.completed} из {sprint.tasks.total} задач
                            </p>
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Sprints;