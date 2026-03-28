import React, { createContext, useState, useEffect } from 'react';
import { 
  currentUser as initialUser, 
  groupsData as initialGroups, 
  roadmapsData as initialRoadmaps,
  initialMessages,
  activityFeed as initialActivity, 
  resourcesData as initialResources, 
  chartData as initialChart,
  availableUsers
} from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rmsync_user_v2');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('rmsync_groups_v2');
    return saved ? JSON.parse(saved) : initialGroups;
  });

  const [activeGroupId, setActiveGroupId] = useState(() => {
    const saved = localStorage.getItem('rmsync_activeGroupId_v2');
    return saved ? saved : initialGroups[0].id;
  });

  const [roadmaps, setRoadmaps] = useState(() => {
    const saved = localStorage.getItem('rmsync_roadmap_v2');
    return saved ? JSON.parse(saved) : initialRoadmaps;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('rmsync_messages_v2');
    return saved ? JSON.parse(saved) : initialMessages;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('rmsync_activities_v2');
    return saved ? JSON.parse(saved) : initialActivity;
  });

  const [resources] = useState(initialResources);
  const [charts] = useState(initialChart);
  const [toastMsg, setToastMsg] = useState(null);

  // Persistence
  useEffect(() => { localStorage.setItem('rmsync_user_v2', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('rmsync_groups_v2', JSON.stringify(groups)); }, [groups]);
  useEffect(() => { localStorage.setItem('rmsync_activeGroupId_v2', activeGroupId); }, [activeGroupId]);
  useEffect(() => { localStorage.setItem('rmsync_roadmap_v2', JSON.stringify(roadmaps)); }, [roadmaps]);
  useEffect(() => { localStorage.setItem('rmsync_messages_v2', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('rmsync_activities_v2', JSON.stringify(activities)); }, [activities]);

  // Derived State
  const activeGroup = groups.find(g => g.id === activeGroupId) || groups[0];
  const activeRoadmap = roadmaps[activeGroup.activeRoadmap];
  const activeMessages = messages[activeGroupId] || [];

  // Actions
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    showToast("Profile updated successfully");
  };

  const switchGroup = (id) => {
    setActiveGroupId(id);
  };

  const sendMessage = (text, type = "text", attachment = null) => {
    if (!text.trim() && !attachment) return;
    
    const newMessage = {
      id: `m_${Date.now()}`,
      userId: user.id,
      user: user.name,
      avatar: user.avatar,
      text: text,
      timestamp: "Just now",
      type: type,
      attachment: attachment
    };

    setMessages(prev => ({
      ...prev,
      [activeGroupId]: [...(prev[activeGroupId]||[]), newMessage]
    }));
  };

  const createGroup = (name, description, activeRoadmapId, members) => {
    const newGroupId = `g_${Date.now()}`;
    const newGroup = {
      id: newGroupId,
      name,
      description,
      activeRoadmap: activeRoadmapId,
      progress: 0,
      members: members.map(m => ({
        id: m.id, name: m.name, avatar: m.avatar, progress: 0, status: "Active", currentTask: "Just Started"
      }))
    };
    
    // Auto add self
    if (!newGroup.members.find(m => m.id === user.id)) {
      newGroup.members.unshift({
        id: user.id, name: user.name, avatar: user.avatar, progress: 0, status: "Active", currentTask: "Just Started"
      });
    }

    setGroups(prev => [...prev, newGroup]);
    setMessages(prev => ({ ...prev, [newGroupId]: [] }));
    setActiveGroupId(newGroupId);
    showToast("Group created successfully");
  };

  const inviteMember = (memberData) => {
    setGroups(prev => prev.map(g => {
      if (g.id !== activeGroupId) return g;
      if (g.members.find(m => m.id === memberData.id)) return g;
      return {
        ...g,
        members: [...g.members, {
          ...memberData, progress: 0, status: "Active", currentTask: "Onboarding"
        }]
      };
    }));
    showToast(`${memberData.name} invited!`);
    
    setActivities(prev => [{
      id: `af_${Date.now()}`,
      user: "You",
      action: "invited",
      target: memberData.name,
      time: "Just now"
    }, ...prev]);
  };

  const deleteGroup = (groupId) => {
    setGroups(prev => {
      const filtered = prev.filter(g => g.id !== groupId);
      // If no groups left, might want to provide a fallback, but we'll assume at least 1 remains or we reset.
      if (filtered.length === 0) {
        return initialGroups; // Fallback so app doesn't break
      }
      if (activeGroupId === groupId) {
        setActiveGroupId(filtered[0].id);
      }
      return filtered;
    });
    showToast("Group deleted.");
  };

  const toggleTask = (roadmapId, sectionId, taskId) => {
    setRoadmaps(prev => {
      const currentRoadmap = prev[roadmapId];
      if (!currentRoadmap) return prev;

      const newSections = currentRoadmap.sections.map(section => {
        if (section.id === sectionId) {
          const tasks = section.tasks.map(task => {
            if (task.id === taskId) {
              const newStatus = task.status === "Completed" ? "Not Started" : "Completed";
              return { ...task, status: newStatus };
            }
            return task;
          });
          
          const allCompleted = tasks.every(t => t.status === "Completed");
          return { ...section, tasks, milestone: { ...section.milestone, unlocked: allCompleted } };
        }
        return section;
      });

      return { ...prev, [roadmapId]: { ...currentRoadmap, sections: newSections } };
    });
  };

  return (
    <AppContext.Provider value={{
      user, updateProfile,
      groups, activeGroup, switchGroup, createGroup, inviteMember, deleteGroup,
      roadmap: activeRoadmap, toggleTask,
      messages: activeMessages, sendMessage,
      activities,
      resources,
      charts,
      availableUsers,
      toastMsg
    }}>
      {children}
    </AppContext.Provider>
  );
};
