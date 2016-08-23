import { Component } from '@angular/core';
import { TeamMemberModel } from '../../models/team-member/team-member.model';

@Component({
  selector: '[gcs-team-member-modal]',
  inputs: ['team_member'],
  templateUrl: './app/components/team-member-modal/team-member-modal.html'
})
export class GCS_TeamMemberModal
{
  team_member: TeamMemberModel;
}

/*
  // TeamMemberModel
  first_name: string;
  last_name: string;
  title: string;
  linkedin_url: string;
  bio: {
    description: string[],
    credits: string[]
  }
*/