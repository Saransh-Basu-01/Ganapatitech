
import { Globe, Bot, Zap, Wrench, Code, Shield, Database } from "lucide-react";

export const getServiceIcon = (serviceName) => {
  const name = serviceName.toLowerCase();
  
  // CCTV / Security
  if (name.includes('cctv') || name.includes('security') || name.includes('surveillance')) {
    return { icon: Shield, gradient: "from-blue-500 to-cyan-500" };
  }
  
  // AI Models
  if (name.includes('ai') && (name.includes('model') || name.includes('solution'))) {
    return { icon: Bot, gradient: "from-purple-500 to-pink-500" };
  }
  
  // Microagents
  if (name.includes('microagent') || name.includes('automation')) {
    return { icon: Zap, gradient: "from-green-500 to-teal-500" };
  }
  
  // Web Development
  if (name.includes('web') && name.includes('development')) {
    return { icon: Code, gradient: "from-indigo-500 to-blue-400" };
  }
  
  // AI Agents
  if (name.includes('ai agent')) {
    return { icon: Bot, gradient: "from-pink-500 to-purple-400" };
  }
  
  // ML/AI Apps
  if (name.includes('ml') || name.includes('machine learning') || name.includes('app')) {
    return { icon: Database, gradient: "from-orange-500 to-red-400" };
  }
  
  // Default fallback
  return { icon: Globe, gradient: "from-gray-500 to-slate-500" };
};
