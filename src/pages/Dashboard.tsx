import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Nav from '@/components/Nav';
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react';

const salesData = [
  { date: 'Apr 1', revenue: 240 },
  { date: 'Apr 2', revenue: 321 },
  { date: 'Apr 3', revenue: 198 },
  { date: 'Apr 4', revenue: 278 },
  { date: 'Apr 5', revenue: 350 },
  { date: 'Apr 6', revenue: 420 },
  { date: 'Apr 7', revenue: 389 },
];

const topProducts = [
  { name: 'T-shirt', sales: 120 },
  { name: 'Sneakers', sales: 98 },
  { name: 'Watch', sales: 75 },
  { name: 'Backpack', sales: 60 },
  { name: 'Headphones', sales: 45 },
];

const customerSegments = [
  { name: 'New', value: 400 },
  { name: 'Returning', value: 300 },
  { name: 'VIP', value: 100 },
];

const COLORS = ['#18181b', '#52525b', '#a1a1aa'];

const stats = [
  { title: 'Total Revenue', value: '$12,426', change: '+12.5%', icon: DollarSign },
  { title: 'Orders', value: '1,234', change: '+8.2%', icon: ShoppingCart },
  { title: 'Products', value: '89', change: '+3', icon: Package },
  { title: 'Customers', value: '2,543', change: '-2.4%', icon: Users },
];

function Dashboard() {
  return (
    <>
      <Nav />
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-7xl mx-auto p-6 space-y-6 animate-fade-in'>
          {/* Header */}
          <div>
            <h1 className='text-2xl font-semibold text-gray-900'>Dashboard</h1>
            <p className='text-gray-600 mt-1'>Overview of your store performance</p>
          </div>

          {/* Stats Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {stats.map((stat) => (
              <Card key={stat.title} className='border border-gray-200 shadow-sm'>
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between'>
                    <stat.icon className='w-5 h-5 text-gray-400' />
                    <span className='text-sm font-medium text-green-600'>{stat.change}</span>
                  </div>
                  <div className='mt-4'>
                    <p className='text-sm text-gray-600'>{stat.title}</p>
                    <p className='text-2xl font-semibold text-gray-900 mt-1'>{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Sales Chart */}
            <Card className='lg:col-span-2 border border-gray-200 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width='100%' height={280}>
                  <LineChart data={salesData}>
                    <XAxis
                      dataKey='date'
                      stroke='#9ca3af'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke='#9ca3af'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='revenue'
                      stroke='#18181b'
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Segments */}
            <Card className='border border-gray-200 shadow-sm'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-900'>Customers</CardTitle>
              </CardHeader>
              <CardContent className='flex justify-center'>
                <ResponsiveContainer width='100%' height={280}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={90}
                      dataKey='value'
                      label>
                      {customerSegments.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card className='border border-gray-200 shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold text-gray-900'>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={280}>
                <BarChart data={topProducts}>
                  <XAxis
                    dataKey='name'
                    stroke='#9ca3af'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke='#9ca3af'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey='sales' fill='#18181b' radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
