import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../hooks/useApp';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Tooltip } from '../components/ui/Tooltip';
import { Check, ChevronDown, Lock, Trophy, PlayCircle, ExternalLink, Clock, Target, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';

export const Roadmap = () => {
  const { roadmap, activeGroup, toggleTask } = useApp();
  const [expandedSection, setExpandedSection] = useState(roadmap.sections[0]?.id);
  
  // Calculate total roadmap progress
  const allTasks = roadmap.sections.flatMap(s => s.tasks);
  const totalCompleted = allTasks.filter(t => t.status === "Completed").length;
  const overallProgress = Math.round((totalCompleted / allTasks.length) * 100) || 0;

  // Find Next Recommended Task
  let nextTaskFound = false;
  let nextSectionId = null;
  let nextTaskId = null;
  
  for (let s of roadmap.sections) {
    if (nextTaskFound) break;
    for (let t of s.tasks) {
      if (t.status !== "Completed") {
        nextTaskFound = true;
        nextSectionId = s.id;
        nextTaskId = t.id;
        break;
      }
    }
  }

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Completed': return <Badge variant="success" className="text-[10px]"><Check size={10} className="inline mr-1"/> Done</Badge>;
      case 'In Progress': return <Badge variant="warning" className="text-[10px]"><PlayCircle size={10} className="inline mr-1"/> Doing</Badge>;
      default: return <Badge variant="default" className="text-[10px]">Pending</Badge>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8 pb-20 pt-4"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-dark-900 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
         {/* Background glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex-1">
          <Badge variant="primary" className="mb-3 inline-flex items-center gap-1">
            <Target size={12}/> Route: {activeGroup.name}
          </Badge>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-accent-500 max-w-2xl">
            {roadmap.title}
          </h1>
          <p className="text-gray-400 mt-2 text-lg max-w-3xl">{roadmap.description}</p>
        </div>
        
        <div className="relative z-10 w-full md:w-64 bg-dark-950 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between text-sm mb-2 text-gray-300">
            <span>Overall Mastery</span>
            <span className="font-bold text-primary-400">{overallProgress}%</span>
          </div>
          <ProgressBar progress={overallProgress} height="h-2" />
          <div className="mt-3 text-xs text-center text-gray-500">
            {totalCompleted} of {allTasks.length} objectives cleared
          </div>
        </div>
      </div>

      <div className="relative pl-2 md:pl-0">
        {/* Connecting Vertical Line */}
        <div className="absolute top-8 bottom-0 left-[34px] md:left-[27px] w-1 bg-dark-800 rounded-full" />
        <div 
          className="absolute top-8 left-[34px] md:left-[27px] w-1 bg-primary-500 rounded-full transition-all duration-1000"
          style={{ height: `calc(${overallProgress}% - 32px)`, maxHeight: '100%' }}
        />

        <div className="space-y-8">
          {roadmap.sections.map((section, index) => {
            const completedCount = section.tasks.filter(t => t.status === "Completed").length;
            const progress = (completedCount / section.tasks.length) * 100;
            
            // Lock mechanic: section is locked if the PREVIOUS section's milestone is NOT unlocked.
            // (First section is always unlocked)
            const isLocked = index > 0 && !roadmap.sections[index - 1].milestone.unlocked;
            
            // Expanded mechanic: Can only expand if not locked.
            const isExpanded = expandedSection === section.id && !isLocked;
            
            return (
              <div key={section.id} className="relative z-10 flex gap-4 md:gap-8 opacity-100 transition-opacity">
                {/* Node Tracker */}
                <div className="flex-shrink-0 mt-6 relative z-20">
                  <div className={cn(
                    "w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center transition-all duration-500 shadow-glass bg-dark-950",
                    isLocked 
                      ? "border-dark-700 text-gray-600"
                      : progress === 100 
                        ? "border-primary-500 text-primary-400 shadow-glow" 
                        : "border-primary-500/50 text-white" 
                  )}>
                    {isLocked ? <Lock size={18} /> : progress === 100 ? <Trophy size={18} /> : <span className="font-bold">{index + 1}</span>}
                  </div>
                </div>

                {/* Section Content */}
                <Card className={cn(
                  "flex-1 transition-all duration-300", 
                  isExpanded ? "ring-1 ring-primary-500/50" : "hover:bg-dark-800",
                  isLocked && "opacity-50 pointer-events-none grayscale-[50%]"
                )}>
                  <div 
                    className="cursor-pointer"
                    onClick={() => {
                      if (!isLocked) setExpandedSection(isExpanded ? null : section.id);
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h2 className="text-xl font-bold">{section.title}</h2>
                          {isLocked && <Badge variant="warning"><Lock size={10} className="inline mr-1" /> Locked</Badge>}
                        </div>
                        <p className="text-sm text-gray-400">{section.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between md:justify-end gap-6 pr-2">
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><Clock size={14}/> {section.estimatedTime}</span>
                          <span className="flex items-center gap-1"><Target size={14}/> {section.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {!isLocked && (
                            <Badge variant={progress === 100 ? 'success' : 'default'} className="hidden sm:inline-flex">
                              {completedCount} / {section.tasks.length} Completed
                            </Badge>
                          )}
                          {!isLocked && <ChevronDown className={cn("transition-transform text-gray-400", isExpanded && "rotate-180")} size={24} />}
                        </div>
                      </div>
                    </div>
                    {!isLocked && <ProgressBar progress={progress} height="h-1.5" />}
                  </div>

                  <AnimatePresence>
                    {isExpanded && !isLocked && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 pt-2">
                          {section.tasks.map((task) => {
                            const isNextTask = task.id === nextTaskId && section.id === nextSectionId;
                            const isCompleted = task.status === "Completed";
                            
                            return (
                              <div 
                                key={task.id}
                                className={cn(
                                  "flex flex-col sm:flex-row gap-4 p-4 rounded-xl transition-all border group relative",
                                  isCompleted ? "bg-primary-500/5 border-primary-500/20" : "bg-dark-900 border-white/5 hover:border-white/10",
                                  isNextTask && "ring-1 ring-accent-500 shadow-[0_0_15px_rgba(236,72,153,0.15)] bg-accent-900/10"
                                )}
                              >
                                {/* Next Task Indicator */}
                                {isNextTask && (
                                  <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-500 rounded-full" />
                                )}

                                <div className="flex items-start gap-4 flex-1 cursor-pointer" onClick={() => toggleTask(roadmap.id, section.id, task.id)}>
                                  <div className={cn(
                                    "w-6 h-6 shrink-0 rounded-md border flex items-center justify-center transition-all mt-0.5",
                                    isCompleted 
                                      ? "bg-primary-500 border-primary-500 text-white shadow-glow" 
                                      : "border-gray-500 group-hover:border-gray-400"
                                  )}>
                                    {isCompleted && <Check size={14} strokeWidth={3} />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                      <span className={cn(
                                        "text-base font-semibold transition-colors",
                                        isCompleted ? "text-gray-400 line-through" : "text-white"
                                      )}>
                                        {task.title}
                                      </span>
                                      {isNextTask && (
                                        <Badge variant="accent" className="text-[9px] animate-pulse">Up Next <ArrowRight size={10} className="inline ml-1"/></Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-gray-400 mt-1">{task.desc}</p>
                                  </div>
                                </div>

                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 pl-10 sm:pl-0 sm:border-l sm:border-white/5 sm:pl-4 min-w-[140px]">
                                  {getStatusBadge(task.status)}
                                  
                                  {task.resources && task.resources.length > 0 && (
                                    <div className="flex flex-wrap gap-2 justify-end">
                                      {task.resources.map((res, i) => (
                                        <Tooltip key={i} content={`Open ${res}`}>
                                          <a 
                                            href="#" 
                                            onClick={(e) => e.stopPropagation()}
                                            className="inline-flex items-center gap-1.5 text-xs text-primary-400 hover:text-primary-300 bg-primary-500/10 hover:bg-primary-500/20 px-2 py-1 rounded transition-colors"
                                          >
                                            <ExternalLink size={12} /> {res}
                                          </a>
                                        </Tooltip>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Milestone Card */}
                        <div className="mt-6 p-4 rounded-xl border border-white/5 bg-gradient-to-r from-dark-950 to-dark-900 flex items-center gap-4 relative overflow-hidden">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-all z-10 shrink-0",
                            section.milestone.unlocked 
                              ? "bg-gradient-to-br from-accent-500 to-primary-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)]" 
                              : "bg-dark-800 text-gray-600"
                          )}>
                            {section.milestone.unlocked ? <Trophy size={20} /> : <Lock size={20} />}
                          </div>
                          <div className="z-10 flex-1">
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                              Milestone
                            </div>
                            <div className={cn("font-bold text-lg", section.milestone.unlocked ? "text-white" : "text-gray-500")}>
                              {section.milestone.title}
                            </div>
                          </div>
                          {section.milestone.unlocked && (
                            <Badge variant="accent" className="z-10">Unlocked!</Badge>
                          )}
                          
                          {/* Animated confetti/glow effect block if unlocked */}
                          {section.milestone.unlocked && (
                             <motion.div 
                               initial={{ opacity: 0, scale: 0 }}
                               animate={{ opacity: 0.1, scale: 1 }}
                               className="absolute -right-10 -top-10 w-40 h-40 bg-accent-500 blur-3xl rounded-full pointer-events-none"
                             />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
