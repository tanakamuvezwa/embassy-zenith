import React from 'react';
import { Users, FileText, Clock, CheckCircle, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("totalApplications"),
      value: "1,284",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: t("pendingReview"),
      value: "89",
      change: "+8%",
      icon: Clock,
      color: "text-guinea-yellow"
    },
    {
      title: t("approvedStatus"),
      value: "45",
      change: "+23%",
      icon: CheckCircle,
      color: "text-guinea-green"
    },
    {
      title: "Published Articles",
      value: "127",
      change: "+5%",
      icon: FileText,
      color: "text-embassy-navy"
    }
  ];

  const recentApplications = [
    { id: 'V001', name: 'John Smith', type: 'Tourist', status: 'Pending', date: '2024-01-15', priority: 'Normal' },
    { id: 'V002', name: 'Maria Garcia', type: 'Business', status: 'Approved', date: '2024-01-14', priority: 'High' },
    { id: 'V003', name: 'David Chen', type: 'Student', status: 'Under Review', date: '2024-01-14', priority: 'Normal' },
    { id: 'V004', name: 'Sarah Johnson', type: 'Tourist', status: 'Approved', date: '2024-01-13', priority: 'Low' },
    { id: 'V005', name: 'Ahmed Hassan', type: 'Work', status: 'Pending', date: '2024-01-13', priority: 'High' },
  ];

  const recentActivities = [
    { action: 'New visa application submitted', user: 'John Smith', time: '2 minutes ago', type: 'application' },
    { action: 'Article published', user: 'Admin', time: '1 hour ago', type: 'content' },
    { action: 'Visa approved', user: 'Maria Garcia', time: '3 hours ago', type: 'approval' },
    { action: 'Document uploaded', user: 'David Chen', time: '5 hours ago', type: 'document' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-guinea-green/10 text-guinea-green border-guinea-green/20';
      case 'Pending': return 'bg-guinea-yellow/10 text-guinea-yellow border-guinea-yellow/20';
      case 'Under Review': return 'bg-guinea-blue/10 text-guinea-blue border-guinea-blue/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-guinea-red/10 text-guinea-red border-guinea-red/20';
      case 'Normal': return 'bg-guinea-blue/10 text-guinea-blue border-guinea-blue/20';
      case 'Low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('dashboard')}</h1>
            <p className="text-muted-foreground mt-2">{t('welcomeMessage')}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-guinea-green border-guinea-green/20">
              <CheckCircle className="h-3 w-3 mr-1" />
              System Online
            </Badge>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Reports
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-guinea-green">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {t('recentApplications')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 rounded-full p-2">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{application.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {application.id} • {application.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(application.priority)}`}>
                        {application.priority}
                      </Badge>
                      <Badge className={`text-xs ${getStatusColor(application.status)}`}>
                        {application.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 py-2">
                    <div className={`rounded-full p-1 ${
                      activity.type === 'application' ? 'bg-guinea-blue/10' :
                      activity.type === 'approval' ? 'bg-guinea-green/10' :
                      activity.type === 'content' ? 'bg-guinea-yellow/10' :
                      'bg-muted'
                    }`}>
                      {activity.type === 'application' && <Users className="h-3 w-3 text-guinea-blue" />}
                      {activity.type === 'approval' && <CheckCircle className="h-3 w-3 text-guinea-green" />}
                      {activity.type === 'content' && <FileText className="h-3 w-3 text-guinea-yellow" />}
                      {activity.type === 'document' && <AlertCircle className="h-3 w-3 text-muted-foreground" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}