import styled from "styled-components";

export default styled.span`
  margin-left: 20px;
  text-transform: uppercase;

  font-style: normal;
  font-family: "Courier New", Courier, monospace;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 17px;
  /* identical to box height */

  color: ${({ selected, theme }) =>
    selected ? theme.color.secondary : theme.color.primary};
  opacity: 0.7;

  cursor: pointer;

  transition: all 200ms ease;
  &:hover {
    color: ${({ theme }) => theme.color.secondary};
  }
`;
