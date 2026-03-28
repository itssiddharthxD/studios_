export const currentUser = {
  id: "u1",
  name: "Siddharth",
  avatar: "https://i.pravatar.cc/150?u=u1",
  role: "Learner",
  bio: "Aspiring software engineer exploring web tech.",
  stats: {
    tasksCompleted: 42,
    streak: 14,
    level: "Intermediate",
    groupRank: 2,
  },
  achievements: [
    { id: "a1", name: "Early Bird", icon: "🌅", desc: "Log in before 8 AM for 5 days" },
    { id: "a2", name: "Slow Learner", icon: "🚀", desc: "Complete 10 tasks in a day" },
    { id: "a3", name: "Collaborator", icon: "🤝", desc: "Help a group member 5 times" }
  ]
};

// Available users to invite
export const availableUsers = [
  { id: "u5", name: "Neha", avatar: "https://i.pravatar.cc/150?u=u5", role: "UI Designer" },
  { id: "u6", name: "Karan", avatar: "https://i.pravatar.cc/150?u=u6", role: "Backend Dev" },
  { id: "u7", name: "Sneha", avatar: "https://i.pravatar.cc/150?u=u7", role: "Fullstack" }
];

export const groupsData = [
  {
    id: "g1",
    name: "Frontend Pioneers",
    description: "Learning React and the modern ecosystem together.",
    activeRoadmap: "r1", // Matches roadmapData ID
    progress: 68,
    members: [
      { id: "u1", name: "Siddharth", avatar: "https://i.pravatar.cc/150?u=u1", progress: 75, status: "Ahead", currentTask: "React Hooks" },
      { id: "u2", name: "Aman", avatar: "https://i.pravatar.cc/150?u=u2", progress: 65, status: "Active", currentTask: "JavaScript ES6" },
      { id: "u3", name: "Priya", avatar: "https://i.pravatar.cc/150?u=u3", progress: 60, status: "Behind", currentTask: "CSS Grid" },
      { id: "u4", name: "Rahul", avatar: "https://i.pravatar.cc/150?u=u4", progress: 72, status: "Active", currentTask: "React Context" }
    ]
  },
  {
    id: "g2",
    name: "Algorithm Crushers",
    description: "Daily Leetcode & System Design prep.",
    activeRoadmap: "r2", 
    progress: 45,
    members: [
      { id: "u1", name: "Siddharth", avatar: "https://i.pravatar.cc/150?u=u1", progress: 50, status: "Active", currentTask: "Dynamic Programming" },
      { id: "u5", name: "Neha", avatar: "https://i.pravatar.cc/150?u=u5", progress: 30, status: "Behind", currentTask: "Graph BFS" }
    ]
  }
];

// Messages keyed by Group ID
export const initialMessages = {
  g1: [
    { id: "m1", userId: "u2", user: "Aman", avatar: "https://i.pravatar.cc/150?u=u2", text: "Hey team! Has anyone figured out the custom hook stuff?", timestamp: "10:00 AM", type: "text" },
    { id: "m2", userId: "u4", user: "Rahul", avatar: "https://i.pravatar.cc/150?u=u4", text: "Yeah, you have to ensure you prefix the function with 'use'.", timestamp: "10:05 AM", type: "text" },
    { id: "m3", userId: "u1", user: "Siddharth", avatar: "https://i.pravatar.cc/150?u=u1", text: "I found this helpful cheat sheet:", attachment: "https://reactjs.org/docs/hooks-custom.html", timestamp: "10:10 AM", type: "file" }
  ],
  g2: [
    { id: "m4", userId: "u5", user: "Neha", avatar: "https://i.pravatar.cc/150?u=u5", text: "Anyone want to mock interview tomorrow?", timestamp: "Yesterday", type: "text" }
  ]
};

export const roadmapsData = {
  r1: {
    id: "r1",
    title: "Modern Web Development Pro",
    description: "Master full-stack frontend engineering from basic HTML to deploying server-rendered applications with Next.js.",
    sections: [
      {
        id: "s1",
        title: "HTML, CSS & Web Accessibility",
        description: "Learn the robust structure and styling mechanics of the web.",
        difficulty: "Beginner",
        estimatedTime: "2 Weeks",
        tasks: [
          { id: "t1", title: "Semantic HTML Elements", desc: "Understanding tags like <article>, <section>, <nav>", status: "Completed", resources: ["MDN Web Docs"] },
          { id: "t2", title: "CSS Flexbox & Grid", desc: "Mastering 1D and 2D layouts", status: "Completed", resources: ["Flexbox Froggy", "CSS Grid Garden"] },
          { id: "t3", title: "Web Accessibility (a11y)", desc: "ARIA roles, screen readers, contrast ratios", status: "Completed", resources: ["A11y Project"] },
          { id: "t4", title: "Responsive Design Strategies", desc: "Media queries and fluid typography", status: "Completed", resources: ["Kevin Powell YouTube"] }
        ],
        milestone: { title: "Styling Master", unlocked: true }
      },
      {
        id: "s2",
        title: "JavaScript Essentials",
        description: "The logic layer. Master DOM manipulation, ES6+, and asynchronous flows.",
        difficulty: "Intermediate",
        estimatedTime: "3 Weeks",
        tasks: [
          { id: "t5", title: "Variables, Scopes, Closures", desc: "How memory works in JS", status: "Completed", resources: ["javascript.info"] },
          { id: "t6", title: "DOM Manipulation & Events", desc: "Event bubbling, capture, handling clicks", status: "Completed", resources: ["FreeCodeCamp"] },
          { id: "t7", title: "Modern ES6+ Syntax", desc: "Destructuring, spread, modules", status: "In Progress", resources: ["Wes Bos ES6 Content"] },
          { id: "t8", title: "Async JS (Promises & Await)", desc: "Handling fetching, resolving, rejecting", status: "Not Started", resources: ["Fireship YouTube"] }
        ],
        milestone: { title: "JS Ninja", unlocked: false }
      },
      {
        id: "s3",
        title: "React Core Fundamentals",
        description: "Building scalable and reusable component-driven UIs.",
        difficulty: "Intermediate",
        estimatedTime: "3 Weeks",
        tasks: [
          { id: "t9", title: "JSX & Component Lifecycles", desc: "Understanding how components render", status: "Not Started", resources: ["React.dev"] },
          { id: "t10", title: "Hooks: useState & useEffect", desc: "Managing local state and side effects", status: "Not Started", resources: ["Dan Abramov Blog"] },
          { id: "t11", title: "Context API", desc: "Prop drilling prevention", status: "Not Started", resources: ["React.dev"] },
          { id: "t12", title: "Custom Hooks", desc: "Abstracting reusable logic", status: "Not Started", resources: ["useHooks"] }
        ],
        milestone: { title: "React Alchemist", unlocked: false }
      },
      {
        id: "s4",
        title: "Advanced React Patterns",
        description: "Performance, routing, and sophisticated state management.",
        difficulty: "Advanced",
        estimatedTime: "4 Weeks",
        tasks: [
          { id: "t13", title: "React Router v6", desc: "Client side routing, layouts, loaders", status: "Not Started", resources: ["React Router Docs"] },
          { id: "t14", title: "Memoization", desc: "useMemo, useCallback, React.memo", status: "Not Started", resources: ["Web Dev Simplified"] },
          { id: "t15", title: "Global State Management", desc: "Redux Toolkit or Zustand", status: "Not Started", resources: ["Zustand Github"] }
        ],
        milestone: { title: "State Commander", unlocked: false }
      },
      {
        id: "s5",
        title: "Next.js & Server Rendering",
        description: "Learn Next.js App Router for high-performance SaaS applications.",
        difficulty: "Expert",
        estimatedTime: "3 Weeks",
        tasks: [
          { id: "t16", title: "App Router & Server Components", desc: "RSC vs Client Components", status: "Not Started", resources: ["Next.js Docs"] },
          { id: "t17", title: "Data Fetching & Caching", desc: "fetch() patches, Revalidation", status: "Not Started", resources: ["Vercel Blog"] },
          { id: "t18", title: "Server Actions", desc: "Mutating data without API routes", status: "Not Started", resources: ["Next.js Learn"] }
        ],
        milestone: { title: "Fullstack Architect", unlocked: false }
      },
      {
        id: "s6",
        title: "Deployment & DevOps",
        description: "Ship your code to production like a pro.",
        difficulty: "Advanced",
        estimatedTime: "2 Weeks",
        tasks: [
          { id: "t19", title: "Git Workflows & CI/CD", desc: "Actions, rebasing, branching", status: "Not Started", resources: ["Atlassian Git"] },
          { id: "t20", title: "Vercel / Netlify Deployment", desc: "Edge networks and environment variables", status: "Not Started", resources: ["Vercel Docs"] },
          { id: "t21", title: "Performance Monitioring", desc: "Lighthouse, Vitals, Sentry", status: "Not Started", resources: ["Web.dev"] }
        ],
        milestone: { title: "Production Ready", unlocked: false }
      }
    ]
  },
  r2: {
    id: "r2",
    title: "Data Structures & Algorithms",
    description: "Ace your computational thinking with core algorithmic patterns.",
    sections: [
      {
        id: "s4",
        title: "Arrays and Hashing",
        description: "The foundational mapping logic",
        difficulty: "Beginner",
        estimatedTime: "1 Week",
        tasks: [
          { id: "t13", title: "Two Sum", desc: "Find paired elements", status: "Completed", resources: ["Leetcode"] }
        ],
        milestone: { title: "Array Master", unlocked: true }
      }
    ]
  }
};

export const activityFeed = [
  { id: "af1", user: "Aman", action: "completed", target: "JavaScript ES6+", time: "2 hours ago" },
  { id: "af2", user: "Priya", action: "started", target: "CSS Grid", time: "5 hours ago" },
  { id: "af3", user: "You", action: "unlocked milestone", target: "JS Ninja", time: "1 day ago" },
  { id: "af4", user: "Rahul", action: "completed", target: "Promises and Async/Await", time: "1 day ago" }
];

export const resourcesData = [
  { id: "rc1", title: "Official React Docs", platform: "Docs", difficulty: "All Levels", url: "#", badge: "Essential" },
  { id: "rc2", title: "Namaste JavaScript", platform: "YouTube", difficulty: "Intermediate", url: "#", badge: "Highly Rated" },
  { id: "rc3", title: "TypeScript Crash Course", platform: "Course", difficulty: "Beginner", url: "#", badge: "New" },
  { id: "rc4", title: "Framer Motion Animations", platform: "YouTube", difficulty: "Advanced", url: "#", badge: "UI/UX" }
];

export const chartData = [
  { name: 'Mon', completion: 12 },
  { name: 'Tue', completion: 19 },
  { name: 'Wed', completion: 15 },
  { name: 'Thu', completion: 22 },
  { name: 'Fri', completion: 30 },
  { name: 'Sat', completion: 10 },
  { name: 'Sun', completion: 42 },
];
