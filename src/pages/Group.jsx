import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../hooks/useApp';
import { Card } from '../components/ui/Card';
import { Avatar } from '../components/ui/Avatar';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Users, TrendingUp, UserPlus, GitCommit, Send, Paperclip, Check, Plus, Trash2, AlertTriangle } from 'lucide-react';

export const Group = () => {
  const { user, activeGroup, messages, sendMessage, groups, createGroup, availableUsers, inviteMember, deleteGroup } = useApp();
  const [chatInput, setChatInput] = useState("");
  const messagesEndRef = useRef(null);
  
  // Modals state
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      sendMessage(chatInput, "text");
      setChatInput("");
    }
  };

  const handleFakeAttachment = () => {
    sendMessage("Shared an attachment", "file", "https://example.com/mock-file.pdf");
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    createGroup(newGroupName, newGroupDesc, "r1", selectedMembers);
    setIsCreateOpen(false);
    setNewGroupName("");
    setNewGroupDesc("");
    setSelectedMembers([]);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8 pb-20 relative h-[calc(100vh-140px)] flex flex-col md:flex-row gap-6"
    >
      {/* LEFT COLUMN: Members & Analytics */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sticky top-0 bg-dark-950/90 py-2 z-10 backdrop-blur-md">
          <div>
            <h1 className="text-3xl font-bold">{activeGroup.name}</h1>
            <p className="text-gray-400 mt-1 flex items-center gap-2">
              <Users size={16} /> {activeGroup.members.length} Members
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setIsInviteOpen(true)} className="gap-2">
              <UserPlus size={16} /> Invite
            </Button>
            <Button variant="gradient" onClick={() => setIsCreateOpen(true)} className="gap-2 shrink-0">
              <Plus size={16} /> New Group
            </Button>
            <Button variant="ghost" onClick={() => setIsDeleteOpen(true)} className="gap-2 shrink-0 text-red-500 hover:text-red-400 hover:bg-red-500/10">
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {/* Group Analytics */}
        <Card className="bg-gradient-to-r from-dark-800 to-primary-900/20 p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-500/20 rounded-full text-primary-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Group Velocity</h2>
              <p className="text-sm text-gray-400">Combined learning pace</p>
            </div>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Total Completion</span>
            <span className="font-bold text-primary-400">{activeGroup.progress}%</span>
          </div>
          <ProgressBar progress={activeGroup.progress} height="h-2" />
        </Card>

        {/* Member Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {activeGroup.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card glow={member.status === 'Ahead'} className="h-full flex flex-col p-4">
                <div className="flex justify-between items-start mb-3">
                  <Avatar src={member.avatar} size="md" current={member.id === user.id} />
                  <Badge variant={member.status === 'Ahead' ? 'primary' : member.status === 'Behind' ? 'warning' : 'default'}>
                    {member.status}
                  </Badge>
                </div>
                <div className="mt-1 font-bold text-base">{member.name} {member.id === user.id && "(You)"}</div>
                <div className="mt-4 flex-1">
                  <div className="flex justify-between text-xs mb-1.5 text-gray-400">
                    <span>Progress</span>
                    <span className="font-bold text-white">{member.progress}%</span>
                  </div>
                  <ProgressBar progress={member.progress} height="h-1.5" animated={false} />
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Current Focus</div>
                  <div className="text-xs font-medium flex items-center gap-1.5 text-gray-300">
                    <GitCommit size={12} className="text-primary-400 shrink-0" />
                    <span className="truncate">{member.currentTask}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Chat View */}
      <Card className="w-full md:w-96 lg:w-[400px] flex flex-col h-[500px] md:h-full p-0 overflow-hidden relative border border-white/10 shadow-glass">
        <div className="p-4 border-b border-white/10 bg-dark-900 flex justify-between items-center z-10 shadow-sm">
          <h2 className="font-bold flex items-center gap-2">
            Team Chat <span className="flex w-2 h-2 rounded-full bg-green-500 ml-1 shadow-glow" />
          </h2>
          <span className="text-xs text-gray-500">{messages.length} messages</span>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-dark-950/50">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              const isMine = msg.userId === user.id;
              
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10, originX: isMine ? 1 : 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  layout
                  className={`flex flex-col max-w-[85%] ${isMine ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1.5 px-1">
                    {!isMine && <Avatar src={msg.avatar} size="sm" className="w-5 h-5" />}
                    <span className="text-xs text-gray-400">{isMine ? "You" : msg.user} • {msg.timestamp}</span>
                  </div>
                  <div className={`
                    px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${isMine 
                      ? 'bg-primary-500 text-white rounded-tr-sm shadow-glow' 
                      : 'bg-dark-800 text-gray-200 border border-white/5 rounded-tl-sm'
                    }
                  `}>
                    {msg.text}
                    {msg.type === "file" && (
                      <div className="mt-2 p-2 bg-black/20 rounded-lg flex items-center gap-2 border border-white/10">
                        <Paperclip size={14} className="text-gray-300" />
                        <span className="text-xs underline truncate">{msg.attachment.split('/').pop()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-dark-900 border-t border-white/10 flex items-center gap-2">
          <button type="button" onClick={handleFakeAttachment} className="p-2 text-gray-400 hover:text-white transition-colors bg-dark-800 rounded-xl">
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-dark-800 border border-transparent focus:border-primary-500/30 rounded-xl px-4 py-2 text-sm text-white outline-none transition-colors"
          />
          <button 
            type="submit" 
            disabled={!chatInput.trim()}
            className="p-2 bg-primary-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-400 transition-colors shadow-glow"
          >
            <Send size={18} />
          </button>
        </form>
      </Card>


      {/* -- MODALS -- */}

      {/* Invite Modal */}
      <Modal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} title="Invite to Group">
        <p className="text-sm text-gray-400 mb-4">Select users from your network to invite to {activeGroup.name}</p>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {availableUsers.map(u => {
            const isAlreadyMember = activeGroup.members.some(m => m.id === u.id);
            return (
              <div key={u.id} className="flex items-center justify-between p-3 rounded-xl bg-dark-800 border border-white/5">
                <div className="flex items-center gap-3">
                  <Avatar src={u.avatar} size="sm" />
                  <div>
                    <div className="text-sm font-bold text-white">{u.name}</div>
                    <div className="text-xs text-gray-400">{u.role}</div>
                  </div>
                </div>
                <Button 
                  variant={isAlreadyMember ? "ghost" : "primary"} 
                  disabled={isAlreadyMember}
                  onClick={() => inviteMember(u)}
                >
                  {isAlreadyMember ? "Joined" : "Invite"}
                </Button>
              </div>
            )
          })}
        </div>
      </Modal>

      {/* Create Group Modal */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create New Group">
        <form onSubmit={handleCreateGroup} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Group Name</label>
            <input 
              required
              type="text" 
              value={newGroupName} 
              onChange={e => setNewGroupName(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2 text-sm outline-none" 
              placeholder="e.g. Design Masters"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
            <input 
              type="text" 
              value={newGroupDesc} 
              onChange={e => setNewGroupDesc(e.target.value)}
              className="w-full bg-dark-800 border border-white/10 focus:border-primary-500 rounded-xl px-4 py-2 text-sm outline-none" 
              placeholder="What is this group learning?"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-2">Initial Members (Optional)</label>
            <div className="grid grid-cols-2 gap-2">
              {availableUsers.map(u => {
                const isSelected = selectedMembers.some(sm => sm.id === u.id);
                return (
                  <div 
                    key={u.id}
                    onClick={() => {
                      if (isSelected) setSelectedMembers(prev => prev.filter(sm => sm.id !== u.id));
                      else setSelectedMembers(prev => [...prev, u]);
                    }}
                    className={`cursor-pointer border rounded-xl p-2 flex items-center gap-2 transition-colors ${
                      isSelected ? 'bg-primary-500/20 border-primary-500' : 'bg-dark-800 border-white/5'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'bg-primary-500 border-primary-500' : 'border-gray-500'}`}>
                      {isSelected && <Check size={10} className="text-white" />}
                    </div>
                    <span className="text-sm font-medium">{u.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="pt-2">
            <Button type="submit" variant="gradient" className="w-full">Create & Join Group</Button>
          </div>
        </form>
      </Modal>

      {/* Delete Group Modal */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} title="Delete Group">
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-6 border border-red-500/50">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Delete {activeGroup.name}?</h3>
          <p className="text-gray-400 mb-8 max-w-sm">
            Are you sure you want to permanently delete this group? All chat history and member progress will be lost.
          </p>
          <div className="flex items-center gap-4 w-full">
            <Button className="w-full" variant="secondary" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
            <Button 
              className="w-full bg-red-500 hover:bg-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]" 
              onClick={() => {
                deleteGroup(activeGroup.id);
                setIsDeleteOpen(false);
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};
