import { Injectable } from '@nestjs/common';
import {supabase} from '../common/supabase.client'

@Injectable()
export class ProjectsService {
  async createProject(userId: string, data: any) {
    const { data: project, error } = await supabase
      .from('projects')
      .insert([
        {
          user_id: userId,
          name: data.name,
          description: data.description,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return project;
  }

  async getProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  return data;
}

async updateProject(id: string, userId: string, data: any) {
  const { data: project, error } = await supabase
    .from('projects')
    .update({
      name: data.name,
      description: data.description,
    })
    .eq('id', id)
    .eq('user_id', userId) // 🔥 security
    .select()
    .single();

  if (error) throw error;

  return project;
}

async deleteProject(id: string, userId: string) {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', userId); // 🔥 security

  if (error) throw error;

  return { message: 'Project deleted' };
}
}
