import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    taskAssigned: true,
    taskCompleted: true,
    comments: true,
    mentions: true,
    deadlines: true,
    email: false,
    telegram: true
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
          <Button variant="ghost" className="w-full justify-start">
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
          <Button variant="default" className="w-full justify-start">
            <Icon name="Settings" className="mr-2" size={20} />
            Настройки
          </Button>
        </nav>
      </aside>

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Настройки</h2>
          <p className="text-muted-foreground">Управление профилем и параметрами системы</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Icon name="Bell" size={16} className="mr-2" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="security">
              <Icon name="Shield" size={16} className="mr-2" />
              Безопасность
            </TabsTrigger>
            <TabsTrigger value="team">
              <Icon name="Users" size={16} className="mr-2" />
              Команда
            </TabsTrigger>
            <TabsTrigger value="integrations">
              <Icon name="Plug" size={16} className="mr-2" />
              Интеграции
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Личная информация</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarFallback className="text-3xl bg-primary/20 font-semibold">
                    АИ
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Upload" size={16} className="mr-2" />
                    Загрузить фото
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG до 5MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input id="firstName" defaultValue="Александр" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input id="lastName" defaultValue="Иванов" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="a.ivanov@company.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Должность</Label>
                  <Input id="role" defaultValue="Frontend Developer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <Select defaultValue="moscow">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moscow">Москва (UTC+3)</SelectItem>
                      <SelectItem value="spb">Санкт-Петербург (UTC+3)</SelectItem>
                      <SelectItem value="ekb">Екатеринбург (UTC+5)</SelectItem>
                      <SelectItem value="nsk">Новосибирск (UTC+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Язык</Label>
                  <Select defaultValue="ru">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline">Отмена</Button>
                <Button>Сохранить изменения</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Уведомления о задачах</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Назначение задачи</Label>
                    <p className="text-sm text-muted-foreground">Когда вам назначают новую задачу</p>
                  </div>
                  <Switch 
                    checked={notifications.taskAssigned}
                    onCheckedChange={(checked) => setNotifications({...notifications, taskAssigned: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Выполнение задачи</Label>
                    <p className="text-sm text-muted-foreground">Когда задача отмечена как выполненная</p>
                  </div>
                  <Switch 
                    checked={notifications.taskCompleted}
                    onCheckedChange={(checked) => setNotifications({...notifications, taskCompleted: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Комментарии</Label>
                    <p className="text-sm text-muted-foreground">Новые комментарии к вашим задачам</p>
                  </div>
                  <Switch 
                    checked={notifications.comments}
                    onCheckedChange={(checked) => setNotifications({...notifications, comments: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Упоминания</Label>
                    <p className="text-sm text-muted-foreground">Когда вас упоминают в комментариях</p>
                  </div>
                  <Switch 
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => setNotifications({...notifications, mentions: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Приближение дедлайна</Label>
                    <p className="text-sm text-muted-foreground">За 24 часа до окончания срока</p>
                  </div>
                  <Switch 
                    checked={notifications.deadlines}
                    onCheckedChange={(checked) => setNotifications({...notifications, deadlines: checked})}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Каналы уведомлений</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Mail" size={20} className="text-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <Label>Email уведомления</Label>
                      <p className="text-sm text-muted-foreground">a.ivanov@company.com</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Icon name="Send" size={20} className="text-blue-400" />
                    </div>
                    <div className="space-y-0.5">
                      <Label>Telegram</Label>
                      <p className="text-sm text-muted-foreground">@alexandr_ivanov</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notifications.telegram}
                    onCheckedChange={(checked) => setNotifications({...notifications, telegram: checked})}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Изменить пароль</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <Button className="mt-6">Обновить пароль</Button>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Двухфакторная аутентификация</h3>
              
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1">
                  <p className="font-medium">2FA отключена</p>
                  <p className="text-sm text-muted-foreground">Добавьте дополнительный уровень защиты</p>
                </div>
                <Button variant="outline">Включить 2FA</Button>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h3 className="text-lg font-semibold mb-4">Активные сессии</h3>
              
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Monitor" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">MacBook Pro</p>
                      <p className="text-sm text-muted-foreground">Chrome · Москва, Россия</p>
                      <p className="text-xs text-muted-foreground mt-1">Активна сейчас</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Завершить
                  </Button>
                </div>

                <div className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Icon name="Smartphone" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">iPhone 14</p>
                      <p className="text-sm text-muted-foreground">Safari · Москва, Россия</p>
                      <p className="text-xs text-muted-foreground mt-1">2 часа назад</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Завершить
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Управление командой</h3>
                <Button>
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Пригласить участника
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="text-sm bg-primary/20">АИ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Александр Иванов</p>
                      <p className="text-sm text-muted-foreground">a.ivanov@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select defaultValue="admin">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Админ</SelectItem>
                        <SelectItem value="member">Участник</SelectItem>
                        <SelectItem value="viewer">Наблюдатель</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="text-sm bg-primary/20">МП</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Мария Петрова</p>
                      <p className="text-sm text-muted-foreground">m.petrova@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select defaultValue="member">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Админ</SelectItem>
                        <SelectItem value="member">Участник</SelectItem>
                        <SelectItem value="viewer">Наблюдатель</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarFallback className="text-sm bg-primary/20">ДК</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Дмитрий Козлов</p>
                      <p className="text-sm text-muted-foreground">d.kozlov@company.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select defaultValue="member">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Админ</SelectItem>
                        <SelectItem value="member">Участник</SelectItem>
                        <SelectItem value="viewer">Наблюдатель</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-card/50 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Icon name="Send" size={24} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Telegram</h3>
                      <p className="text-sm text-muted-foreground">Уведомления в чат</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Получайте мгновенные уведомления о задачах в Telegram
                </p>
                <Button variant="outline" size="sm">Настроить</Button>
              </Card>

              <Card className="p-6 bg-card/50 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Icon name="FileText" size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Google Drive</h3>
                      <p className="text-sm text-muted-foreground">Файлы и документы</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Прикрепляйте файлы из Google Drive к задачам
                </p>
                <Button variant="outline" size="sm">Подключить</Button>
              </Card>

              <Card className="p-6 bg-card/50 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Icon name="Github" size={24} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">GitHub</h3>
                      <p className="text-sm text-muted-foreground">Репозитории и PR</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Связывайте задачи с коммитами и pull request
                </p>
                <Button variant="outline" size="sm">Подключить</Button>
              </Card>

              <Card className="p-6 bg-card/50 border-border/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                      <Icon name="Slack" size={24} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Slack</h3>
                      <p className="text-sm text-muted-foreground">Командный чат</p>
                    </div>
                  </div>
                  <Switch />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Получайте обновления задач в Slack каналы
                </p>
                <Button variant="outline" size="sm">Подключить</Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
