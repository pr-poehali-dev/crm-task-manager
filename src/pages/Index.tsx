import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

type Priority = 'low' | 'medium' | 'high';
type Status = 'todo' | 'in-progress' | 'review' | 'done';

interface Project {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignees: string[];
  dueDate: string;
  comments: number;
  projectId: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'dashboard' | 'kanban'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<string>('all');
  
  const [projects] = useState<Project[]>([
    { id: '1', name: 'Веб-приложение', color: 'bg-blue-500', icon: 'Globe' },
    { id: '2', name: 'Мобильное приложение', color: 'bg-purple-500', icon: 'Smartphone' },
    { id: '3', name: 'Маркетинг', color: 'bg-green-500', icon: 'TrendingUp' }
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Разработать главную страницу',
      description: 'Создать дизайн и верстку главной страницы с Hero секцией',
      status: 'in-progress',
      priority: 'high',
      assignees: ['АИ', 'МП'],
      dueDate: '2024-11-05',
      comments: 3,
      projectId: '1'
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
      projectId: '1'
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
      projectId: '1'
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
      projectId: '1'
    },
    {
      id: '5',
      title: 'Дизайн экрана авторизации',
      description: 'Создать UI для входа и регистрации',
      status: 'in-progress',
      priority: 'high',
      assignees: ['МП'],
      dueDate: '2024-11-06',
      comments: 2,
      projectId: '2'
    },
    {
      id: '6',
      title: 'Интеграция с камерой',
      description: 'Реализовать функционал работы с камерой',
      status: 'todo',
      priority: 'medium',
      assignees: ['ДК'],
      dueDate: '2024-11-10',
      comments: 0,
      projectId: '2'
    },
    {
      id: '7',
      title: 'Запустить рекламную кампанию',
      description: 'Настроить таргетированную рекламу',
      status: 'done',
      priority: 'high',
      assignees: ['АИ'],
      dueDate: '2024-10-25',
      comments: 12,
      projectId: '3'
    },
    {
      id: '8',
      title: 'Создать контент-план',
      description: 'План публикаций на месяц',
      status: 'review',
      priority: 'medium',
      assignees: ['МП'],
      dueDate: '2024-11-02',
      comments: 4,
      projectId: '3'
    }
  ]);

  const statusColumns: { id: Status; label: string }[] = [
    { id: 'todo', label: 'К выполнению' },
    { id: 'in-progress', label: 'В работе' },
    { id: 'review', label: 'На проверке' },
    { id: 'done', label: 'Готово' }
  ];

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

  const filteredTasks = selectedProject === 'all' 
    ? tasks 
    : tasks.filter(t => t.projectId === selectedProject);

  const stats = {
    total: filteredTasks.length,
    inProgress: filteredTasks.filter(t => t.status === 'in-progress').length,
    done: filteredTasks.filter(t => t.status === 'done').length,
    overdue: 2
  };
  
  const getProjectProgress = (projectId: string) => {
    const projectTasks = tasks.filter(t => t.projectId === projectId);
    const doneTasks = projectTasks.filter(t => t.status === 'done').length;
    return projectTasks.length > 0 ? Math.round((doneTasks / projectTasks.length) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow CRM
          </h1>
        </div>
        
        <nav className="space-y-2">
          <Button
            variant="default"
            className="w-full justify-start"
          >
            <Icon name="LayoutDashboard" className="mr-2" size={20} />
            Дашборд
          </Button>
          <Button
            variant={activeView === 'kanban' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveView('kanban')}
          >
            <Icon name="KanbanSquare" className="mr-2" size={20} />
            Канбан
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/tasks')}>
            <Icon name="ListTodo" className="mr-2" size={20} />
            Задачи
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/sprints')}>
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
        
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Проекты</h3>
          <div className="space-y-1">
            <Button
              variant={selectedProject === 'all' ? 'secondary' : 'ghost'}
              className="w-full justify-start text-sm"
              onClick={() => setSelectedProject('all')}
            >
              <Icon name="Folder" className="mr-2" size={16} />
              Все проекты
            </Button>
            {projects.map(project => (
              <Button
                key={project.id}
                variant={selectedProject === project.id ? 'secondary' : 'ghost'}
                className="w-full justify-start text-sm"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className={`w-2 h-2 rounded-full ${project.color} mr-3`} />
                {project.name}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {activeView === 'dashboard' ? 'Дашборд' : 'Канбан доска'}
            </h2>
            <p className="text-muted-foreground">
              {selectedProject === 'all' 
                ? 'Все проекты' 
                : projects.find(p => p.id === selectedProject)?.name}
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="Plus" className="mr-2" size={20} />
                Новая задача
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Создать задачу</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Название задачи</Label>
                  <Input id="title" placeholder="Введите название..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea id="description" placeholder="Описание задачи..." rows={4} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Приоритет</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите приоритет" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий</SelectItem>
                        <SelectItem value="medium">Средний</SelectItem>
                        <SelectItem value="high">Высокий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Дедлайн</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Проект</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите проект" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Исполнители</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите исполнителей" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ai">Александр Иванов</SelectItem>
                        <SelectItem value="mp">Мария Петрова</SelectItem>
                        <SelectItem value="dk">Дмитрий Козлов</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline">Отмена</Button>
                <Button>Создать</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {activeView === 'dashboard' ? (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">Всего задач</span>
                  <Icon name="CheckCircle2" size={20} className="text-primary" />
                </div>
                <div className="text-3xl font-bold">{stats.total}</div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-blue-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">В работе</span>
                  <Icon name="Clock" size={20} className="text-blue-400" />
                </div>
                <div className="text-3xl font-bold">{stats.inProgress}</div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-green-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">Завершено</span>
                  <Icon name="CheckCheck" size={20} className="text-green-400" />
                </div>
                <div className="text-3xl font-bold">{stats.done}</div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-red-500/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground text-sm">Просрочено</span>
                  <Icon name="AlertCircle" size={20} className="text-red-400" />
                </div>
                <div className="text-3xl font-bold">{stats.overdue}</div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Прогресс по проектам</h3>
              <div className="space-y-4">
                {projects.map(project => {
                  const progress = getProjectProgress(project.id);
                  const projectTasks = tasks.filter(t => t.projectId === project.id);
                  const doneTasks = projectTasks.filter(t => t.status === 'done').length;
                  
                  return (
                    <div key={project.id}>
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${project.color}`} />
                          <span className="text-foreground font-medium">{project.name}</span>
                        </div>
                        <span className="text-muted-foreground">{doneTasks}/{projectTasks.length} задач</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Активные задачи</h3>
              <div className="space-y-3">
                {filteredTasks.filter(t => t.status !== 'done').map((task) => {
                  const project = projects.find(p => p.id === task.projectId);
                  return (
                  <div
                    key={task.id}
                    className="p-4 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {project && <div className={`w-2 h-2 rounded-full ${project.color}`} />}
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                      </div>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {getPriorityLabel(task.priority)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {task.assignees.map((assignee, i) => (
                            <Avatar key={i} className="h-7 w-7 border-2 border-background">
                              <AvatarFallback className="text-xs bg-primary/20">{assignee}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
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
                );})}
              </div>
            </Card>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="grid grid-cols-4 gap-4">
              {statusColumns.map((column) => (
                <div key={column.id} className="space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      {column.label}
                    </h3>
                    <Badge variant="secondary" className="rounded-full">
                      {tasks.filter(t => t.status === column.id).length}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {filteredTasks
                      .filter(t => t.status === column.id)
                      .map((task) => {
                        const project = projects.find(p => p.id === task.projectId);
                        return (
                        <Card
                          key={task.id}
                          className="p-4 bg-card/50 border-border/50 hover:border-primary/50 transition-all cursor-grab active:cursor-grabbing hover:scale-105"
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {project && <div className={`w-2 h-2 rounded-full ${project.color}`} />}
                                  <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
                                </div>
                              </div>
                              <Badge variant="outline" className={`${getPriorityColor(task.priority)} text-xs`}>
                                {getPriorityLabel(task.priority)}
                              </Badge>
                            </div>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {task.description}
                            </p>
                            
                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                              <div className="flex -space-x-2">
                                {task.assignees.map((assignee, i) => (
                                  <Avatar key={i} className="h-6 w-6 border-2 border-background">
                                    <AvatarFallback className="text-xs bg-primary/20">{assignee}</AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Icon name="MessageSquare" size={14} />
                                  <span className="text-xs">{task.comments}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                  <Icon name="Calendar" size={14} />
                                  <span className="text-xs">
                                    {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );})}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;