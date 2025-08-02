import React from 'react';
import { Users, FileText, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";

const stats = [
  {
    title: "Total Applications",
    value: "1,284",
    change: "+12%",
    icon: Users,
    color: "text-embassy-blue"
  },
  {
    title: "Pending Review",
    value: "89",
    change: "+8%",
    icon: Clock,
    color: "text-embassy-gold"
  },
  {
    title: "Approved Today",
    value: "45",
    change: "+23%",
    icon: CheckCircle,
    color: "text-green-600"
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
  { id: 'V001', name: 'John Smith', type: 'Tourist', status: 'Pending', date: '2024-01-15' },
  { id: 'V002', name: 'Maria Garcia', type: 'Business', status: 'Approved', date: '2024-01-14' },
  { id: 'V003', name: 'David Chen', type: 'Student', status: 'Under Review', date: '2024-01-14' },
  { id: 'V004', name: 'Sarah Johnson', type: 'Tourist', status: 'Approved', date: '2024-01-13' },
  { id: 'V005', name: 'Ahmed Hassan', type: 'Work', status: 'Pending', date: '2024-01-13' },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome to the Embassy Administration Panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Visa Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className="bg-embassy-light rounded-full p-2">
                      <Users className="h-4 w-4 text-embassy-navy" />
                    </div>
                    <div>
                      <p className="font-medium">{application.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {application.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">{application.type}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      application.status === 'Approved' 
                        ? 'bg-green-100 text-green-800' 
                        : application.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status}
                    </span>
                    <span className="text-sm text-muted-foreground">{application.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}