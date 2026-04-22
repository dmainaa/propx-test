import rolesRequest from "../../request/access-management/roles/roles_request"
import { Role } from "../../../../models/role"

describe('Roles API Test Suite', () => {

    let roleId

    it('Verify roles are loaded from api', () => {
        rolesRequest.getRoles().then((response) => {
            expect(response.status).eq(200)
            expect(response.body.data.length).to.be.greaterThan(0)
            roleId = response.body.data[0].id
        })
    })

    it('Verify a single role can be retrieved by id', () => {
        rolesRequest.viewRole().then((response) => {
            expect(response.status).eq(200)
            expect(response.body.data.role).to.not.be.null
            const role = new Role(response.body.data.role)
            expect(role.id).to.be.a('number').and.eq(roleId)
            expect(role.name).to.be.a('string')
            expect(role.description).to.be.a('string')
            expect(role.userGroup).to.not.be.null
            expect(role.userGroup.id).to.be.a('number')
            expect(role.userGroup.title).to.be.a('string')
            expect(role.permissions).to.be.an('array').and.have.length.greaterThan(0)
            const permission = role.permissions[0]
            expect(permission.id).to.be.a('number')
            expect(permission.tag).to.be.a('string')
            expect(permission.resource).to.be.a('string')
            expect(permission.name).to.be.a('string')
        })
    })

})
