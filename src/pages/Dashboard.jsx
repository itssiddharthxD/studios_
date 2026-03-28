import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../hooks/useApp';
import { Card } from '../components/ui/Card';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Activity, Target, Users, Zap, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
  const { user, activeGroup, charts, activities } = useApp();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Welcome back, {user.name} 
          </h1>
          <p className="text-gray-400 mt-1">Ready to tackle some coding today?</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center gap-4">
          <div className="p-4 bg-primary-500/10 rounded-xl text-primary-400">
            <Target size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Personal Progress</div>
            <div className="text-2xl font-bold">{user.stats.level}</div>
          </div>
        </Card>
        
        <Card className="flex items-center gap-4">
          <div className="p-3 bg-accent-500/10 rounded-xl text-accent-400">
            <Users size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Group Progress</div>
            <div className="text-2xl font-bold">{activeGroup.progress}%</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Tasks Completed</div>
            <div className="text-2xl font-bold">{user.stats.tasksCompleted}</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400">
            <Zap size={24} />
          </div>
          <div>
            <div className="text-sm text-gray-400">Current Streak</div>
            <div className="text-2xl font-bold">{user.stats.streak} Days</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity size={20} className="text-primary-400" />
              Learning Velocity
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts}>
                <defs>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completion" 
                  stroke="#8b5cf6" 
                  strokeWidth={4}
                  dot={{ r: 4, fill: '#141414', stroke: '#8b5cf6', strokeWidth: 3 }}
                  activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card glow className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-dark-800 to-primary-900/10">
            <ProgressRing radius={60} stroke={7} progress={75} label="Roadmap" />
            <h3 className="font-bold mt-4 text-lg">You're doing great!</h3>
            <p className="text-sm text-gray-400 mt-2">You are ahead of 60% of your group 🚀</p>
          </Card>

          <Card>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity size={18} className="text-accent-400" /> Activity Feed
            </h2>
            <div className="space-y-4">
              {activities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="relative mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500 shadow-glow" />
                    <div className="absolute top-2 left-1 w-[1px] h-full bg-white/10 -translate-x-1/2" />
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-white">{activity.user}</span>{' '}
                      <span className="text-gray-400">{activity.action}</span>{' '}
                      <span className="text-primary-400 font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};
