import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/atoms/Button'
import { Badge } from '@/components/atoms/Badge'
import { Typography } from '@/components/atoms/Typography'
import { MetricCard } from '@/components/molecules/MetricCard'
import { Separator } from '@/components/ui/separator'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  TrendingUp, 
  Users, 
  Eye,
  Sparkles,
  BarChart3,
  Target
} from 'lucide-react'

export const DesignSystemPage = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>('overview')

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <Typography variant="heading1" className="text-3xl">
            🎨 Soash Design System
          </Typography>
          <Typography variant="body" className="text-lg max-w-2xl mx-auto">
            Interactive component library showcasing atomic design principles with prototype examples
          </Typography>
        </div>

        <Tabs value={selectedComponent} onValueChange={setSelectedComponent} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="atoms">Atoms</TabsTrigger>
            <TabsTrigger value="molecules">Molecules</TabsTrigger>
            <TabsTrigger value="organisms">Organisms</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="tokens">Tokens</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Atomic Design Hierarchy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Typography variant="heading3" color="primary">Atoms</Typography>
                    <Typography variant="caption">Basic building blocks</Typography>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Typography variant="heading3" className="text-green-700">Molecules</Typography>
                    <Typography variant="caption">Simple combinations</Typography>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Typography variant="heading3" className="text-purple-700">Organisms</Typography>
                    <Typography variant="caption">Complex sections</Typography>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Typography variant="heading3" className="text-yellow-700">Templates</Typography>
                    <Typography variant="caption">Page layouts</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Atoms Tab */}
          <TabsContent value="atoms" className="space-y-6">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button variant="primary">Primary CTA</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4 items-center">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="content">Content Insight</Badge>
                  <Badge variant="timing">Timing Insight</Badge>
                  <Badge variant="strategy">Strategy Insight</Badge>
                </div>
                <Separator />
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="performance" performance="high">High Performance</Badge>
                  <Badge variant="performance" performance="medium">Medium Performance</Badge>
                  <Badge variant="performance" performance="low">Low Performance</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Typography variant="heading1">Heading 1 - Main Titles</Typography>
                <Typography variant="heading2">Heading 2 - Section Titles</Typography>
                <Typography variant="heading3">Heading 3 - Subsection Titles</Typography>
                <Typography variant="body">Body text - Main content and descriptions</Typography>
                <Typography variant="caption">Caption text - Small text and metadata</Typography>
                <Typography variant="label">Label text - Form labels and identifiers</Typography>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Molecules Tab */}
          <TabsContent value="molecules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Metric Cards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <MetricCard
                    icon={Heart}
                    value="2,847"
                    label="Total Likes"
                    badge={{ text: "89% Confidence", variant: "content" }}
                    trend={{ value: "+23%", direction: "up" }}
                  />
                  <MetricCard
                    icon={MessageCircle}
                    value="524"
                    label="Comments"
                    badge={{ text: "High Performance", variant: "performance", performance: "high" }}
                    trend={{ value: "+12%", direction: "up" }}
                  />
                  <MetricCard
                    icon={Share2}
                    value="156"
                    label="Shares"
                    badge={{ text: "Medium Performance", variant: "performance", performance: "medium" }}
                    trend={{ value: "-5%", direction: "down" }}
                  />
                  <MetricCard
                    icon={Eye}
                    value="12.5K"
                    label="Reach"
                    badge={{ text: "Timing Insight", variant: "timing" }}
                    trend={{ value: "+34%", direction: "up" }}
                  />
                  <MetricCard
                    icon={Users}
                    value="1,204"
                    label="Followers Gained"
                    badge={{ text: "Strategy Insight", variant: "strategy" }}
                    trend={{ value: "+8%", direction: "up" }}
                  />
                  <MetricCard
                    icon={TrendingUp}
                    value="4.2%"
                    label="Engagement Rate"
                    badge={{ text: "Low Performance", variant: "performance", performance: "low" }}
                    trend={{ value: "-12%", direction: "down" }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Organisms Tab */}
          <TabsContent value="organisms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Header Example</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-6 bg-white rounded-xl border border-gray-200">
                  <div className="space-y-2">
                    <Typography variant="heading1">Welcome back, Sarah! 👋</Typography>
                    <Typography variant="body">Here's your social media performance overview</Typography>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline">Export Data</Button>
                    <Button variant="primary">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Insights
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Assistant Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    <Typography variant="heading2">AI Content Suggestions</Typography>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-20 flex-col space-y-2" variant="primary">
                      <BarChart3 className="w-5 h-5" />
                      <span>Analyze Performance</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Target className="w-5 h-5" />
                      <span>Optimize Strategy</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Ideas</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout Template</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="grid grid-cols-4 gap-4 h-96">
                    <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300">
                      <Typography variant="caption" className="text-center">Sidebar Navigation</Typography>
                    </div>
                    <div className="col-span-3 space-y-4">
                      <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300 h-16">
                        <Typography variant="caption" className="text-center">Top Navigation</Typography>
                      </div>
                      <div className="bg-white p-4 rounded border-2 border-dashed border-gray-300 flex-1">
                        <Typography variant="caption" className="text-center">Main Content Area</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tokens Tab */}
          <TabsContent value="tokens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Color Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
                    <Typography variant="caption">Primary Gradient</Typography>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-900 rounded"></div>
                    <Typography variant="caption">Primary Dark</Typography>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-200 rounded"></div>
                    <Typography variant="caption">Secondary</Typography>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-16 bg-gray-50 rounded border"></div>
                    <Typography variant="caption">Background</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24].map((size) => (
                  <div key={size} className="flex items-center space-x-4">
                    <div className={`bg-blue-500 h-4`} style={{ width: `${size * 4}px` }}></div>
                    <Typography variant="caption">space-{size} ({size * 4}px)</Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}