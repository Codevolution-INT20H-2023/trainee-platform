import { Avatar as MuiAvatar, Box, Typography } from '@mui/material';
import NextLink from 'next/link';
import styled from 'styled-components';

export const Wrapper = styled(Box)``;

export const Container = styled(Box)``;

export const Avatar = styled(MuiAvatar)`
  width: 10rem;
  height: 10rem;
`;

export const Heading = styled(Box)`
  display: flex;
  gap: 3rem;
`;

export const HeadingInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Name = styled(Typography)`
  font-weight: 900;
  font-size: 4rem;
  line-height: 1.25;
`;

export const Position = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const Email = styled(Typography)`
  font-weight: 700;
  font-size: 1.25rem;
`;

export const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1200px;
  margin: 4rem auto 0;
`;

export const ContentSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ContentSectionTitle = styled(Typography)`
  font-size: 3rem;
  font-weight: 700;
`;

export const ContentSectionBody = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const Description = styled(Typography)``;

export const Link = styled(NextLink)`
  color: inherit;
  text-decoration: none;
  transition: all 225ms ease-in;

  &:hover {
    text-decoration: underline;
  }
`;

export const Project = styled(Box)``;

export const ProjectTitle = styled(Typography)`
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;
