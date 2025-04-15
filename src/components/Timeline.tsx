import React from 'react';
import styled from '@emotion/styled';
import { Box, Chip, Typography } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { timelineData } from '../data/timelineData';

const TimelineContainer = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  background: linear-gradient(to bottom, #8B3A86 0%, #00A7E1 100%);
  height: calc(100% - 80px);
  top: 40px;
`;

const TimelineEntry = styled.div<{ position: 'left' | 'right' }>`
  width: 43%;
  margin: 6em 0;
  position: relative;
  ${({ position }) => position === 'left' ? 'margin-right: auto;' : 'margin-left: 57%;'}
  
  &:first-of-type {
    margin-top: 1em;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 3em 0;
    ${({ position }) => position === 'left' ? 'margin-right: 0;' : 'margin-left: 0;'}
  }
`;

const TimelineIcon = styled.div<{ isExperience?: boolean }>`
  position: absolute;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ isExperience }) => isExperience ? '#8B3A86' : '#FF7F41'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  ${({ isExperience }) => isExperience ? 'right: -78px;' : 'left: -78px;'}
  top: 0;
  box-shadow: 0 0 0 8px white;
  z-index: 2;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 26px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TimelineDate = styled.div<{ position?: 'left' | 'right' }>`
  position: absolute;
  top: 14px;
  color: #8B3A86;
  font-weight: 600;
  font-size: 1rem;
  ${({ position }) => position === 'left' ? 'right: -220px;' : 'left: -220px;'}
  opacity: 0.9;

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    margin-bottom: 1em;
    text-align: left;
  }
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(139, 58, 134, 0.1), 0 2px 4px -1px rgba(139, 58, 134, 0.06);
  border: 1px solid rgba(139, 58, 134, 0.1);
  transition: all 0.3s ease;

  h5, h6 {
    color: #8B3A86;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(139, 58, 134, 0.1), 0 10px 10px -5px rgba(139, 58, 134, 0.04);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TechnologyChip = styled(Chip)<{ isExperience?: boolean }>`
  margin: 0.4rem;
  background-color: ${({ isExperience }) => isExperience ? '#F5F0F5' : '#FFF4F0'};
  color: ${({ isExperience }) => isExperience ? '#8B3A86' : '#FF7F41'};
  font-size: 0.875rem;
  height: 32px;
  font-weight: 500;
  border: 1px solid ${({ isExperience }) => isExperience ? '#E8D5E6' : '#FFE4D6'};
  padding: 0 12px;

  &:hover {
    background-color: ${({ isExperience }) => isExperience ? '#EFE5EE' : '#FFE9E0'};
  }
`;

const AchievementItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0.8em 0;
  gap: 14px;

  svg {
    color: #00A7E1;
    font-size: 1.35rem;
    margin-top: 2px;
  }
`;

const Title = styled(Typography)`
  && {
    color: #8B3A86;
    font-weight: 600;
  }
`;

const Subtitle = styled(Typography)`
  && {
    color: #00A7E1;
    opacity: 0.9;
  }
`;

const Description = styled(Typography)`
  && {
    color: #333;
    margin: 1em 0;
  }
`;

const Timeline: React.FC = () => {
  const experiences = timelineData.filter(item => item.type === 'experience');
  
  return (
    <div className="timeline-section">
      <TimelineContainer>
        <TimelineLine />
        {experiences.map((experience, index) => {
          const relatedProjects = timelineData.filter(
            item => item.type === 'project' && item.parentExperience === experience.title
          );

          return (
            <React.Fragment key={index}>
              <TimelineEntry position="right">
                <TimelineIcon isExperience>
                  <WorkIcon />
                </TimelineIcon>
                <TimelineDate>{experience.date}</TimelineDate>
                <Card>
                  <Title variant="h5">
                    {experience.title}
                  </Title>
                  {experience.subtitle && (
                    <Subtitle variant="subtitle1">
                      {experience.subtitle}
                    </Subtitle>
                  )}
                  <Description variant="body1">
                    {experience.description}
                  </Description>
                  {experience.achievements && (
                    <Box mb={2}>
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <AchievementItem key={achievementIndex}>
                          <CheckCircleOutlineIcon />
                          <Typography variant="body2">{achievement}</Typography>
                        </AchievementItem>
                      ))}
                    </Box>
                  )}
                  <Box display="flex" flexWrap="wrap" gap={0.5}>
                    {experience.technologies.map((tech, techIndex) => (
                      <TechnologyChip
                        key={techIndex}
                        label={tech}
                        size="small"
                        isExperience={true}
                      />
                    ))}
                  </Box>
                </Card>
              </TimelineEntry>

              {relatedProjects.map((project, projectIndex) => (
                <TimelineEntry key={projectIndex} position="left">
                  <TimelineIcon>
                    <CodeIcon />
                  </TimelineIcon>
                  <Card>
                    <Title variant="h6">
                      {project.title}
                    </Title>
                    <Description variant="body2">
                      {project.description}
                    </Description>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {project.technologies.map((tech, techIndex) => (
                        <TechnologyChip
                          key={techIndex}
                          label={tech}
                          size="small"
                          isExperience={false}
                        />
                      ))}
                    </Box>
                  </Card>
                </TimelineEntry>
              ))}
            </React.Fragment>
          );
        })}
      </TimelineContainer>
    </div>
  );
};

export default Timeline; 