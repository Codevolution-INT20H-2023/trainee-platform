import { Box, Typography } from '@mui/material';
import styled from 'styled-components';
import Link from 'next/link';

export const Wrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Container = styled(Box)`
  display: flex;
  padding: 1rem 2.5rem;
  border-radius: 1rem;
  border: 2px solid #ccc;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgb(0 0 0 / 25%);
  gap: 3rem;
  transition: all 225ms ease-in-out;
  text-decoration: none;

  &:hover {
    box-shadow: none;
  }
`;

export const Text = styled(Typography)`
  width: 200px;
  text-overflow: ellipsis;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
`;
