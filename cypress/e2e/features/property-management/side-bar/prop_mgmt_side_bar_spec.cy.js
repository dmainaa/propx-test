import propMgmtSideBarPage from '../../../pages/side-bar/prop_mgmt_side_bar_page'
import menuData from '../../../../fixtures/property-management/property_mgmt_menu.json'

describe('Property Management Sidebar Test Suite', () => {

    beforeEach(() => {
        propMgmtSideBarPage.navigateToApp()
    })

    it('Verify main collapsible menus are visible', () => {
        propMgmtSideBarPage.tenantManagement.should('be.visible').and('contain.text', menuData.tenantManagement.index)
        propMgmtSideBarPage.landlordManagement.should('be.visible').and('contain.text', menuData.landlordManagement.index)
        propMgmtSideBarPage.supplierManagement.should('be.visible').and('contain.text', menuData.supplierManagement.index)
    })

})
