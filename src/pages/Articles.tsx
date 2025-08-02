import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: 'Embassy Services Update',
    author: 'Admin User',
    status: 'Published',
    publishDate: '2024-01-15',
    views: 1250,
    excerpt: 'Important updates regarding embassy services and new procedures.'
  },
  {
    id: 2,
    title: 'Visa Processing Guidelines',
    author: 'John Smith',
    status: 'Draft',
    publishDate: '2024-01-14',
    views: 0,
    excerpt: 'Comprehensive guide for visa processing and requirements.'
  },
  {
    id: 3,
    title: 'Holiday Schedule 2024',
    author: 'Maria Garcia',
    status: 'Published',
    publishDate: '2024-01-10',
    views: 890,
    excerpt: 'Embassy operating hours during holidays and special occasions.'
  },
  {
    id: 4,
    title: 'New Immigration Policies',
    author: 'David Chen',
    status: 'Under Review',
    publishDate: '2024-01-08',
    views: 0,
    excerpt: 'Recent changes in immigration policies and their implications.'
  },
  {
    id: 5,
    title: 'Document Requirements',
    author: 'Sarah Johnson',
    status: 'Published',
    publishDate: '2024-01-05',
    views: 2100,
    excerpt: 'Complete list of required documents for various embassy services.'
  },
];

export default function Articles() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Articles</h1>
            <p className="text-muted-foreground mt-2">Manage embassy articles and announcements</p>
          </div>
          <Link to="/articles/new">
            <Button className="bg-embassy-navy hover:bg-embassy-navy/90">
              <Plus className="h-4 w-4 mr-2" />
              New Article
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Articles ({filteredArticles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Publish Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-muted-foreground">{article.excerpt}</div>
                      </div>
                    </TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(article.status)}>
                        {article.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{article.publishDate}</TableCell>
                    <TableCell>{article.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link to={`/articles/edit/${article.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}