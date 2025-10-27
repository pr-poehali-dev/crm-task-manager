import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

type Priority = 'low' | 'medium' | 'high';
type Status = 'todo' | 'in-progress' | 'review' | 'done';

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignees: string[];
  dueDate: string;
  comments: number;
  sprint?: string;
}

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Разработать главную страницу',
      description: 'Создать дизайн и верстку главной страницы с Hero секцией',
      status: 'in-progress',
      priority: 'high',
      assignees: ['АИ', 'МП'],
      dueDate: '2024-11-05',
      comments: 3,
      sprint: 'Спринт 1'
    },
    {
      id: '2',
      title: 'Настроить API интеграцию',
      description: 'Подключить backend к фронтенду',
      status: 'todo',
      priority: 'medium',
      assignees: ['ДК'],
      dueDate: '2024-11-08',
      comments: 1,
      sprint: 'Спринт 1'
    },
    {
      id: '3',
      title: 'Написать тесты',
      description: 'Unit тесты для компонентов',
      status: 'review',
      priority: 'low',
      assignees: ['АИ'],
      dueDate: '2024-11-03',
      comments: 5,
      sprint: 'Спринт 2'
    },
    {
      id: '4',
      title: 'Оптимизация производительности',
      description: 'Улучшить время загрузки приложения',
      status: 'done',
      priority: 'high',
      assignees: ['МП', 'ДК'],
      dueDate: '2024-10-28',
      comments: 8,
      sprint: 'Спринт 1'
    },
    {
      id: '5',
      title: 'Добавить систему уведомлений',
      description: 'Реализовать push-уведомления для задач',
      status: 'todo',
      priority: 'medium',
      assignees: ['АИ'],
      dueDate: '2024-11-10',
      comments: 0,
      sprint: 'Спринт 2'
    },
    {
      id: '6',
      title: 'Дизайн мобильной версии',
      description: 'Адаптивная верстка для мобильных устройств',
      status: 'in-progress',
      priority: 'high',
      assignees: ['МП'],
      dueDate: '2024-11-07',
      comments: 2,
      sprint: 'Спринт 2'
    }
  ]);

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getPriorityLabel = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'todo': return 'bg-gray-500/20 text-gray-400';
      case 'in-progress': return 'bg-blue-500/20 text-blue-400';
      case 'review': return 'bg-purple-500/20 text-purple-400';
      case 'done': return 'bg-green-500/20 text-green-400';
    }
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case 'todo': return 'К выполнению';
      case 'in-progress': return 'В работе';
      case 'review': return 'На проверке';
      case 'done': return 'Готово';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow CRM
          </h1>
        </div>
        
        <nav className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="LayoutDashboard" className="mr-2" size={20} />
            Дашборд
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="KanbanSquare" className="mr-2" size={20} />
            Канбан
          </Button>
          <Button variant="default" className="w-full justify-start">
            <Icon name="ListTodo" className="mr-2" size={20} />
            Задачи
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Timer" className="mr-2" size={20} />
            Спринты
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Users" className="mr-2" size={20} />
            Команда
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Settings" className="mr-2" size={20} />
            Настройки
          </Button>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Задачи</h2>
          <p className="text-muted-foreground">Управление всеми задачами проекта</p>
        </div>

        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск задач..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Status | 'all')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="todo">К выполнению</SelectItem>
                <SelectItem value="in-progress">В работе</SelectItem>
                <SelectItem value="review">На проверке</SelectItem>
                <SelectItem value="done">Готово</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPriority} onValueChange={(value) => setFilterPriority(value as Priority | 'all')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Приоритет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все приоритеты</SelectItem>
                <SelectItem value="high">Высокий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="low">Низкий</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'grid')}>
              <TabsList>
                <TabsTrigger value="list">
                  <Icon name="List" size={16} />
                </TabsTrigger>
                <TabsTrigger value="grid">
                  <Icon name="LayoutGrid" size={16} />
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button>
              <Icon name="Plus" className="mr-2" size={20} />
              Создать
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>Найдено: {filteredTasks.length} задач</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{tasks.filter(t => t.status === 'todo').length} новых</Badge>
            <Badge variant="secondary">{tasks.filter(t => t.status === 'in-progress').length} в работе</Badge>
            <Badge variant="secondary">{tasks.filter(t => t.status === 'done').length} завершено</Badge>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="space-y-3 animate-fade-in">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="p-5 bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-start gap-4">
                  <Checkbox className="mt-1" />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {getPriorityLabel(task.priority)}
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(task.status)}>
                          {getStatusLabel(task.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {task.assignees.map((assignee, i) => (
                            <Avatar key={i} className="h-7 w-7 border-2 border-background">
                              <AvatarFallback className="text-xs bg-primary/20">{assignee}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        
                        {task.sprint && (
                          <Badge variant="secondary" className="text-xs">
                            <Icon name="Timer" size={12} className="mr-1" />
                            {task.sprint}
                          </Badge>
                        )}

                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Icon name="MessageSquare" size={16} />
                          <span>{task.comments}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        <span>{new Date(task.dueDate).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 animate-fade-in">
            {filteredTasks.map((task) => (
              <Card key={task.id} className="p-5 bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-pointer hover:scale-105">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold flex-1 leading-tight">{task.title}</h3>
                    <Checkbox />
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

                  <div className="flex gap-2">
                    <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs`}>
                      {getPriorityLabel(task.priority)}
                    </Badge>
                    <Badge variant="outline" className={`${getStatusColor(task.status)} text-xs`}>
                      {getStatusLabel(task.status)}
                    </Badge>
                  </div>

                  {task.sprint && (
                    <Badge variant="secondary" className="text-xs w-fit">
                      <Icon name="Timer" size={12} className="mr-1" />
                      {task.sprint}
                    </Badge>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex -space-x-2">
                      {task.assignees.map((assignee, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs bg-primary/20">{assignee}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="MessageSquare" size={14} />
                        <span>{task.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Tasks;
