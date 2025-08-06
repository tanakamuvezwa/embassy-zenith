import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import equatorialGuineaFlag from "@/assets/equatorial-guinea-flag.svg";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Placeholder API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      toast({
        title: "Login successful",
        description: "Welcome to the Embassy Admin Panel",
      });
      
      // In a real app, you would redirect to dashboard here
      window.location.href = '/dashboard';
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-guinea-green via-guinea-blue to-embassy-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={equatorialGuineaFlag} 
              alt="Equatorial Guinea Flag" 
              className="h-20 w-32 object-cover rounded-lg border-2 border-white shadow-2xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            República de Guinea Ecuatorial
          </h1>
          <p className="text-guinea-yellow mt-2 font-medium drop-shadow">Embassy Administration</p>
        </div>

        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center text-foreground">{t('login')}</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t('login')} - Administration Panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@embassy.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t('password')}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t('password')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? "..." : t('signIn')}
              </Button>
            </form>

            <div className="mt-4 text-center space-y-2">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                {t('forgotPassword')}
              </Link>
              <div>
                <span className="text-sm text-muted-foreground">{t('dontHaveAccount')} </span>
                <Link 
                  to="/signup" 
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t('signup')}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}