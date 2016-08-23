import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TeamMemberModel } from '../../models/team-member/team-member.model';
import { GCS_TeamMemberModal } from '../../components/team-member-modal/team-member-modal';

@Component({
  selector: '[gcs-team-member]',
  host: {  
    class: "col-xs-offset-1 col-xs-10 col-md-4 col-md-offset-0"
  },
  inputs: ['team_member'],
  directives: [GCS_TeamMemberModal],
  templateUrl: './app/components/team-member/team-member.html'
})
export class GCS_TeamMember
{
  team_member: TeamMemberModel;

  makeDataTarget(first, last): string
  {
    return(`#bio-${first}-${last}`);
  }
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