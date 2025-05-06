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
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';

const salesData = [
  { date: 'Apr 1', revenue: 240 },
  { date: 'Apr 2', revenue: 321 },
  { date: 'Apr 3', revenue: 198 },
  { date: 'Apr 4', revenue: 278 },
  { date: 'Apr 5', revenue: 350 },
];

const topProducts = [
  { name: 'T-shirt', sales: 120 },
  { name: 'Sneakers', sales: 98 },
  { name: 'Watch', sales: 75 },
  { name: 'Backpack', sales: 60 },
];

const customerSegments = [
  { name: 'New', value: 400 },
  { name: 'Returning', value: 300 },
  { name: 'VIP', value: 100 },
];

const COLORS = ['#6366F1', '#10B981', '#F59E0B'];

function Dashboard() {
  return (
    <div className='p-6 grid gap-6 md:grid-rows-2 xl:grid-cols-3'>
      {/* Sales Over Time */}
      <Card>
        <CardContent>
          <h2 className='text-xl font-bold mb-4'>Sales Over Time</h2>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={salesData}>
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='revenue' stroke='#6366F1' strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardContent>
          <h2 className='text-xl font-bold mb-4'>Top Products</h2>
          <ResponsiveContainer width='100%' height={200}>
            <BarChart data={topProducts}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='sales' fill='#10B981' />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      <Card>
        <CardContent>
          <h2 className='text-xl font-bold mb-4'>Customer Segments</h2>
          <ResponsiveContainer width='100%' height={200}>
            <PieChart>
              <Pie data={customerSegments} cx='50%' cy='50%' outerRadius={70} dataKey='value' label>
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
