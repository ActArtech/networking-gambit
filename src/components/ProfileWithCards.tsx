
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Star, Briefcase, Code, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'expert';
  isRevealed: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  isRevealed: boolean;
}

interface ProfileWithCardsProps {
  userId: string;
  name: string;
  role: string;
  avatarUrl?: string;
  skills: Skill[];
  projects: Project[];
}

const ProfileWithCards = ({
  userId,
  name,
  role,
  avatarUrl,
  skills,
  projects
}: ProfileWithCardsProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [requestingReveal, setRequestingReveal] = useState(false);
  const { toast } = useToast();

  const handleRevealRequest = (itemId: string, itemType: 'skill' | 'project') => {
    setRequestingReveal(true);
    
    // Simulate API call to request a reveal
    setTimeout(() => {
      setRequestingReveal(false);
      toast({
        title: "Reveal Requested",
        description: `You've requested to reveal more about ${name}'s ${itemType}`,
        duration: 3000,
      });
    }, 1000);
  };

  // Count hidden and revealed cards
  const hiddenSkills = skills.filter(skill => !skill.isRevealed).length;
  const hiddenProjects = projects.filter(project => !project.isRevealed).length;
  const revealedSkills = skills.filter(skill => skill.isRevealed).length;
  const revealedProjects = projects.filter(project => project.isRevealed).length;

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      {/* Profile Header */}
      <div className="p-6 border-b border-neutral-100 flex items-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold mr-4 ${
          avatarUrl ? '' : 'bg-neutral-100 text-neutral-700'
        }`}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            name.substring(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-neutral-600">{role}</p>
        </div>
      </div>

      {/* Cards Summary */}
      <div className="px-6 py-4 border-b border-neutral-100 flex justify-between">
        <div className="flex items-center">
          <Eye size={18} className="text-neutral-500 mr-2" />
          <span className="text-sm">
            {revealedSkills + revealedProjects} cards revealed
          </span>
        </div>
        <div className="flex items-center">
          <EyeOff size={18} className="text-neutral-500 mr-2" />
          <span className="text-sm">
            {hiddenSkills + hiddenProjects} cards hidden
          </span>
        </div>
      </div>

      {/* Skills Section */}
      <div className="p-6 border-b border-neutral-100">
        <h4 className="font-medium mb-3 flex items-center">
          <Code size={18} className="mr-2" /> Skills
        </h4>
        <div className="space-y-3">
          {skills.map(skill => (
            <motion.div 
              key={skill.id}
              layoutId={`skill-${skill.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => setExpandedCard(expandedCard === `skill-${skill.id}` ? null : `skill-${skill.id}`)}
              className={`p-3 rounded-xl cursor-pointer transition ${
                skill.isRevealed 
                  ? 'bg-white border border-neutral-200' 
                  : 'bg-neutral-100 border border-neutral-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {skill.isRevealed ? (
                    <>
                      <span className="font-medium">{skill.name}</span>
                      <div className="ml-2 px-2 py-0.5 bg-neutral-100 rounded-full text-xs">
                        {skill.level}
                      </div>
                    </>
                  ) : (
                    <span className="font-medium">Hidden Skill</span>
                  )}
                </div>
                {!skill.isRevealed && (
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRevealRequest(skill.id, 'skill');
                    }}
                    disabled={requestingReveal}
                    className="h-8 text-xs"
                  >
                    Request Reveal
                  </Button>
                )}
              </div>
              
              {expandedCard === `skill-${skill.id}` && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 pt-2 border-t border-neutral-200"
                >
                  {skill.isRevealed ? (
                    <div className="text-sm text-neutral-600">
                      <div className="flex items-center mt-1">
                        <span className="text-neutral-500 mr-2">Expertise Level:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={14}
                              fill={skill.level === 'beginner' && star <= 1 ? 'currentColor' : 
                                    skill.level === 'intermediate' && star <= 3 ? 'currentColor' : 
                                    skill.level === 'expert' && star <= 5 ? 'currentColor' : 'none'}
                              className="text-amber-500"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-neutral-600">
                      <p>This skill is hidden. Request a reveal to learn more.</p>
                      <Button 
                        size="sm" 
                        className="mt-2 w-full bg-neutral-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRevealRequest(skill.id, 'skill');
                        }}
                        disabled={requestingReveal}
                      >
                        Request Reveal
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      <div className="p-6">
        <h4 className="font-medium mb-3 flex items-center">
          <Briefcase size={18} className="mr-2" /> Projects
        </h4>
        <div className="space-y-3">
          {projects.map(project => (
            <motion.div 
              key={project.id}
              layoutId={`project-${project.id}`}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => setExpandedCard(expandedCard === `project-${project.id}` ? null : `project-${project.id}`)}
              className={`p-3 rounded-xl cursor-pointer transition ${
                project.isRevealed 
                  ? 'bg-white border border-neutral-200' 
                  : 'bg-neutral-100 border border-neutral-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  {project.isRevealed ? (
                    <span className="font-medium">{project.name}</span>
                  ) : (
                    <span className="font-medium">Hidden Project</span>
                  )}
                </div>
                {!project.isRevealed && (
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRevealRequest(project.id, 'project');
                    }}
                    disabled={requestingReveal}
                    className="h-8 text-xs"
                  >
                    Request Reveal
                  </Button>
                )}
              </div>
              
              {expandedCard === `project-${project.id}` && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 pt-2 border-t border-neutral-200"
                >
                  {project.isRevealed ? (
                    <p className="text-sm text-neutral-600">{project.description}</p>
                  ) : (
                    <div className="text-sm text-neutral-600">
                      <p>This project is hidden. Request a reveal to learn more.</p>
                      <Button 
                        size="sm" 
                        className="mt-2 w-full bg-neutral-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRevealRequest(project.id, 'project');
                        }}
                        disabled={requestingReveal}
                      >
                        Request Reveal
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileWithCards;
