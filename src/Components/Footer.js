import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size:12px;
`;

const List = styled.ul`
    display: flex;
`;
const ListItem = styled.li`
    &:not(:last-child){
        margin-right: 16px;
    }
`;

const Link = styled.a`
    color: ${props=> props.theme.darkBlueColor};
    cursor: pointer;
`;

const Copyright = styled.span`
    color: ${props=> props.theme.darkGreyColor};
`;

export default () => (
    <Footer>
        <List key={13}>
            <ListItem key={1}><Link href="#">소개</Link></ListItem>
            <ListItem key={2}><Link href="#">도움말</Link></ListItem>
            <ListItem key={3}><Link href="#">홍보</Link></ListItem>
            <ListItem key={4}><Link href="#">센터</Link></ListItem>
            <ListItem key={5}><Link href="#">API</Link></ListItem>
            <ListItem key={6}><Link href="#">채용</Link></ListItem>
            <ListItem key={7}><Link href="#">정보개인정보처리방침약관</Link></ListItem>
            <ListItem key={8}><Link href="#">위치</Link></ListItem>
            <ListItem key={9}><Link href="#">인기</Link></ListItem>
            <ListItem key={10}><Link href="#">계정</Link></ListItem>
            <ListItem key={11}><Link href="#">해시태그</Link></ListItem>
            <ListItem key={12}><Link href="#">언어</Link></ListItem>
        </List>
        <Copyright>
            &copy; {new Date().getFullYear()} PACK-EASY
        </Copyright>
    </Footer>
);
