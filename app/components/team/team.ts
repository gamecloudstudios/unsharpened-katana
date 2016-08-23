import { Component } from '@angular/core';
import { TeamMemberModel, TEAM_GCS } from '../../models/team-member/team-member.model';
import { GCS_TeamMember } from '../../components/team-member/team-member';

@Component({
  selector: 'gcs-team',
  directives: [GCS_TeamMember],
  host: {
    class: 'gcs-bottom-section',
    id: 'gcs-team'
  },
  templateUrl: './app/components/team/team.html'
})
export class GCS_Team
{
  gcs_team: TeamMemberModel[] = TEAM_GCS;
}


