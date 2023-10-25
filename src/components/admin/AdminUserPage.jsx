import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminUserPage = ({ selectedCg, setModalData }) => {
  const users = useSelector(state => state.user);
  const blackUser = useSelector(state => state.blacklist.blackUser)
  const dispatch = useDispatch();
  // event.currentTarget
  return (
    <div className='adminUserPage'>
      {users.filter(p =>
        selectedCg === '' || selectedCg === undefined ?
          p :
          selectedCg === '1' ?
            blackUser.find(q => p.id === q) === undefined :
            blackUser.find(q => p.id === q) !== undefined).filter(p => p.gender !== 'admin').map(p =>
              <div key={p.id} className='adminUserBox'
                onMouseOver={selectedCg === '' || selectedCg === undefined ?
                  e => { } : selectedCg === '1' ?
                    e => { e.currentTarget.style.background = 'red' } :
                    e => { e.currentTarget.style.background = 'blue' }
                }
                onMouseOut={selectedCg === '' || selectedCg === undefined ?
                  e => { } : selectedCg === '1' ?
                    e => { e.currentTarget.style.background = 'none' } :
                    e => { e.currentTarget.style.background = 'none' }
                }
                onClick={selectedCg === '' || selectedCg === undefined ?
                  e => { } : selectedCg === '1' ?
                    e => { dispatch({ type: 'blacklist/addBLU', payload: p.id }) } :
                    e => { dispatch({ type: 'blacklist/delBLU', payload: p.id }) }
                }
              >
                <div>
                  {p.img ?? <><img src={p.img} alt="" /></>}
                </div>
                <div>
                  <span>NickName : {p.nickname}</span><span>ID : {p.id}</span><span>gender : {p.gender}</span><br />
                  <span>phone : {p.phone}</span><span>email : {p.email}</span><br />
                  <span>address : {p.address}</span>
                </div>
              </div>
            )}
    </div>
  )
}

export default AdminUserPage

// id: "admin",
// nickname: "관리자",
// pwd: "1111",
// name: "관리자",
// email: "saessak@gmail.com",
// phone: "01011112222",
// address: "관악구",
// gender: "male",