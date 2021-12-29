import React, { useContext, useState } from 'react'
import styled from "styled-components"
import { useWalletModal, Flex, Button, SvgProps, Text} from '@pancakeswap-libs/uikit'

import { useWeb3React } from '@web3-react/core'
import { LanguageContext } from 'hooks/LanguageContext'
import useTheme from 'hooks/useTheme'
import useGetPriceData from 'hooks/useGetPriceData'
import useGetLocalProfile from 'hooks/useGetLocalProfile'
import useAuth from 'hooks/useAuth'
import { CAKE, MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from '../../constants'

import * as IconModule from "./icons";

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };
const { MoonIcon, SunIcon } = Icons;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;
const Inner = styled.div<{ showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;

`;
/* const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`; */

const Menu: React.FC = (props) => {
  const { account } = useWeb3React()
  const { children } = props;
  const { login, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const priceData = useGetPriceData()
  // const cakePriceUsd = priceData ? Number(priceData.data[CAKE.address].price) : undefined
  // const profile = useGetLocalProfile()
  
  // const { isXl } = useMatchBreakpoints();
  // const isMobile = isXl === false;
  // const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  // const refPrevOffset = useRef(window.pageYOffset);

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account as string)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Flex>
          Pancakeswap Fork
        </Flex>
        <Flex>
          <div>
          {account ? (
            <Button
              scale="sm"
              variant="tertiary"
              onClick={() => {
                onPresentAccountModal();
              }}
            >
              {accountEllipsis}
            </Button>
          ) : (
            <Button
              scale="sm"
              onClick={() => {
                onPresentConnectModal();
              }}
            >
              Connect
            </Button>
          )}
          <Button variant="text" onClick={() => toggleTheme()}>
            {/* alignItems center is a Safari fix */}
            <Flex alignItems="center">
              <SunIcon color={isDark ? "textDisabled" : "text"} width="24px" />
              <Text color="textDisabled" mx="4px">
                /
              </Text>
              <MoonIcon color={isDark ? "text" : "textDisabled"} width="24px" />
            </Flex>
          </Button>
          </div>
        </Flex>
      </StyledNav>
      <BodyWrapper>
        <Inner showMenu={showMenu}>
          {children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
    /* 
    <UikitMenu
      links={links}
      account={account as string}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage?.code || ''}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd}
      profile={profile}
      {...props}
    /> */
  )
}

export default Menu
