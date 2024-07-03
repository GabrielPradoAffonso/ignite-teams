import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center; /* Centraliza horizontalmente */
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  margin-bottom: 24px;
  text-align: center; /* Centraliza o texto horizontalmente */
`;
