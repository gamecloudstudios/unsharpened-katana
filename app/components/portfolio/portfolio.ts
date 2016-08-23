import { Component } from '@angular/core';
import { ProjectModel, PROJECTS } from '../../models/project/project.model';

@Component({
  selector: 'gcs-portfolio',
  host: {
    class: 'gcs-bottom-section',
    id: 'gcs-portfolio'
  },
  templateUrl: './app/components/portfolio/portfolio.html'
})
export class GCS_Portfolio
{
  projects: ProjectModel[] = PROJECTS;
}
