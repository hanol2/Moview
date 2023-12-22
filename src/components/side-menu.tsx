import styled from "styled-components"

const MenuItem = styled.div`
margin: 50px 0;
display:flex;
     width: 300px;
    height: 40px;
background-color: #333333;
border-radius: 50px;
    display : flex;
  align-items : center;
  `

const SearchIcon = styled.label`
svg{
    z-index:1;
    margin: 10px;
    width: 20px;
    height: 20px;ßß
}
`

const SearchInput = styled.input`
    width: 250px;
    height: 40px;
    background-color : inherit;
    border: none;
    color: white;
    border-radius: 10px;
`

export default function SideMenu() {
    return (
        <MenuItem>
        <SearchIcon htmlFor="search">
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path clipRule="evenodd" fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" />
</svg>
        </SearchIcon>
            <SearchInput id="search" placeholder="search" type="text"></SearchInput>
        </MenuItem>
    )
}