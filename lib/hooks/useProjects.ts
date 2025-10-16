import { useState, useEffect } from "react";
import { getAllProjects, getProjectById } from "@/lib/project-data";
import type { Project } from "@/types";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const allProjects = await getAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error("Failed to load projects:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProjects();
  }, []);
  
  return { projects, loading };
}

export function useProject(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) {
        setProject(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const projectData = await getProjectById(id);
        setProject(projectData ?? null);
      } catch (error) {
        console.error(`Failed to load project ${id}:`, error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadProject();
  }, [id]);

  return { project, loading };
}
