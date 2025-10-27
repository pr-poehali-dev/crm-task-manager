import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  status: 'active' | 'away' | 'offline';
  tasks: {
    active: number;
    completed: number;
    total: number;
  };
  skills: string[];
  joinDate: string;
}

const Team = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const [members] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Александр Иванов',
      initials: 'АИ',
      role: 'Frontend Developer',
      email: 'a.ivanov@company.com',
      status: 'active',
      tasks: {
        active: 5,
        completed: 23,
        total: 28
      },
      skills: ['React', 'TypeScript', 'CSS', 'Figma'],
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Мария Петрова',
      initials: 'МП',
      role: 'UI/UX Designer',
      email: 'm.petrova@company.com',
      status: 'active',
      tasks: {
        active: 3,
        completed: 31,
        total: 34
      },
      skills: ['Figma', 'Design System', 'Prototyping', 'UI'],
      joinDate: '2023-03-20'
    },
    {
      id: '3',
      name: 'Дмитрий Козлов',
      initials: 'ДК',
      role: 'Backend Developer',
      email: 'd.kozlov@company.com',
      status: 'away',
      tasks: {
        active: 4,
        completed: 19,
        total: 23
      },
      skills: ['Node.js', 'PostgreSQL', 'Docker', 'API'],
      joinDate: '2023-02-10'
    },
    {
      id: '4',
      name: 'Елена Сидорова',
      initials: 'ЕС',
      role: 'Project Manager',
      email: 'e.sidorova@company.com',
      status: 'active',
      tasks: {
        active: 2,
        completed: 45,
        total: 47
      },
      skills: ['Agile', 'Scrum', 'Planning', 'Communication'],
      joinDate: '2022-11-05'
    },
    {
      id: '5',
      name: 'Игорь Новиков',
      initials: 'ИН',
      role: 'QA Engineer',
      email: 'i.novikov@company.com',
      status: 'offline',
      tasks: {
        active: 1,
        completed: 15,
        total: 16
      },
      skills: ['Testing', 'Automation', 'Cypress', 'Jest'],
      joinDate: '2023-05-12'
    },
    {
      id: '6',
      name: 'Анна Морозова',
      initials: 'АМ',
      role: 'DevOps Engineer',
      email: 'a.morozova@company.com',
      status: 'active',
      tasks: {
        active: 3,
        completed: 27,
        total: 30
      },
      skills: ['CI/CD', 'AWS', 'Kubernetes', 'Monitoring'],
      joinDate: '2023-04-01'
    }
  ]);

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: TeamMember['status']) => {
    switch (status) {
      case 'active': return 'Онлайн';
      case 'away': return 'Отошёл';
      case 'offline': return 'Оффлайн';
    }
  };

  const calculateWorkload = (member: TeamMember) => {
    return Math.round((member.tasks.active / 10) * 100);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    totalTasks: members.reduce((sum, m) => sum + m.tasks.active, 0),
    avgCompletion: Math.round(members.reduce((sum, m) => sum + (m.tasks.completed / m.tasks.total * 100), 0) / members.length)
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
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="LayoutDashboard" className="mr-2" size={20} />
            Дашборд
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="KanbanSquare" className="mr-2" size={20} />
            Канбан
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="ListTodo" className="mr-2" size={20} />
            Задачи
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Icon name="Timer" className="mr-2" size={20} />
            Спринты
          </Button>
          <Button variant="default" className="w-full justify-start">
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Команда</h2>
            <p className="text-muted-foreground">Управление участниками и ролями</p>
          </div>
          
          <Button>
            <Icon name="UserPlus" className="mr-2" size={20} />
            Добавить участника
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Всего участников</span>
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Онлайн</span>
              <Icon name="Activity" size={20} className="text-green-400" />
            </div>
            <div className="text-3xl font-bold">{stats.active}</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Активных задач</span>
              <Icon name="ListTodo" size={20} className="text-blue-400" />
            </div>
            <div className="text-3xl font-bold">{stats.totalTasks}</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Ср. выполнение</span>
              <Icon name="TrendingUp" size={20} className="text-purple-400" />
            </div>
            <div className="text-3xl font-bold">{stats.avgCompletion}%</div>
          </Card>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Поиск участников..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="grid" className="space-y-6">
          <TabsList>
            <TabsTrigger value="grid">
              <Icon name="LayoutGrid" size={16} className="mr-2" />
              Сетка
            </TabsTrigger>
            <TabsTrigger value="list">
              <Icon name="List" size={16} className="mr-2" />
              Список
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                  <div className="text-center mb-4">
                    <div className="relative inline-block mb-3">
                      <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarFallback className="text-2xl bg-primary/20 font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <Badge variant="outline" className="text-xs">
                      {getStatusLabel(member.status)}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Загрузка</span>
                        <span className="font-medium">{member.tasks.active} задач</span>
                      </div>
                      <Progress value={calculateWorkload(member)} className="h-2" />
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Выполнено</span>
                      <span className="font-medium">{member.tasks.completed}/{member.tasks.total}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Навыки:</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {member.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{member.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="Mail" size={14} className="mr-1" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Icon name="MessageSquare" size={14} className="mr-1" />
                      Чат
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="animate-fade-in">
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <Card key={member.id} className="p-5 bg-card/50 border-border/50 hover:border-primary/50 transition-all">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-14 w-14 border-2 border-primary/20">
                        <AvatarFallback className="text-lg bg-primary/20 font-semibold">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`}></div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getStatusLabel(member.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Mail" size={14} />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          <span>С {new Date(member.joinDate).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{member.tasks.active}</div>
                        <div className="text-xs text-muted-foreground">Активных</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">{member.tasks.completed}</div>
                        <div className="text-xs text-muted-foreground">Выполнено</div>
                      </div>
                      <div className="w-32">
                        <div className="text-xs text-muted-foreground mb-1">Загрузка</div>
                        <Progress value={calculateWorkload(member)} className="h-2" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Mail" size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Навыки:</span>
                      {member.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Team;
