export const rolePermissions=[
    {
      name:'Dashboard',
      key:'Dashboard'
    },
    {
        name:'Roles',
        key:'Roles'
      },
    {
      name:'Users',
      key:'Users'
    },
    {
      name:'Catalogue',
      key:'Category'
    },
    {
      name:'Subscription Plan',
      key:'Plan'
    },
    {
      name:'Currency',
      key:'Currency'
    },
    {
      name:'Customers',
      key:'Customers'
    },
    {
      name:'ParticipantTypes',
      key:'ParticipantTypes'
    },
    {
      name:'Skills',
      key:'Skills'
    },
    {
      name:'Group',
      key:'Group'
    },
    {
      name:'Certification',
      key:'Certification'
    },
    {
      name:'Content Management',
      key:'Content'
    },
    {
      name:'Events',
      key:'Events'
    },
  ]

  export const customerRolePermissions=[
    {
      name:'Dashboard',
      key:'Dashboard'
    },
    {
      name:'Events',
      key:'Events'
    },
    {
        name:'Members',
        key:'Members'
      },
  ]

  export const rolePermission=[
    {name:"Read",key:'read'},
    {name:"Add",key:'add'},
    {name:"Edit",key:'edit'},
    {name:"Delete",key:'delete'},
  ]

  export const roleGetAllKeys=(type='admin')=>{
    let keys={};
    let arr=rolePermissions
    if(type=='customer') arr=customerRolePermissions
    arr.map(itm=>{
        rolePermission.map(pitm=>{
        keys={...keys,[`${pitm.key}${itm.key}`]:false}
      })
    })

    return keys
  }

export const userType={ id:'',fullName: '',role:'', email: '', mobileNo: '',aboutUs:'',address:'',image:'',logo:''}
export const CategoryType={id:'',name:'',catType:'',subParentCategory:'',description:'',image:'',order:'',parentCategory:'',status:'active',icon:'',banner:'',altImageName:'',altIconName:'',bannerOverlayHeading:'',bannerOverlayBody:'',description:'',featured:'No',urlKey:'',metaTitle:'',metaDescription:'',keywords:''}
export const roleType={id:'',name:'',status:'active',permissions:roleGetAllKeys()}
export const resellerCategoryType={id:'',name:'',catType:'Reseller',description:'',image:''}
export const planType={id:'',name:'',planType:'',price:'',member:'',status:'active',interval:'Monthly',category:'',recommended:'',allowedProducts:'',feature:[],
monthlyPrice:'',threeMonthPrice:'',sixMonthPrice:'',yearlyPrice:'',extraProductPrice:''

}
export const continentType={id:'',name:'',status:'active'}
export const featureType={id:'',name:'',description:'',status:'active'}
export const emailType={id:'',subject:'',content:'',status:'active'}
export const cityType={id:'',name:'',status:'active',countryId:'',regionId:'',continent:''}
export const bookingSystemType={id:'',name:'',apiKey:'',secretKey:''}
export const holidaysType={id:'',discOrPre:'',name:'',type:'',country:'',counties:'',amountOrPercent:'',number:'',applyFor:[],preOrPost:'',preDays:'',postDays:'',changesApply:'',changesDate:'',changesDateTo:''}
export const earlybirdpricingType={id:'',name:'',discOrPre:'',startDate:'',country:'',counties:'',applyEarlyBirdPricing:[],endDate:'',inventory:[],lastMinutePricingFromDate:'',lastMinutePricingToDate:'',applyPriceType:'',changesDate:'',changesDateTo:'',notApply:'',notApplyCondition:'',notApplicableFor:[],blackOutDates:[],amountOrPercent:'',number:'',applyToDaysTimeSlot:'',daysToApply:[],timeSlots:[]}
export const posType={id:'',name:'',apiKey:'',url:''}

export const resellerType={id:'',name:"",logo:"",category:"",contractDate:"",booking:"",country:'',contactPerson:'',contactPhone:'',contactEmail:'',website:''}
export const couponType={id:'',title:'',status:'active',description:'',couponCode:'',usesPerCoupon:'',usesPerCustomer:'',dateFrom:'',dateTo:'',discountType:'',discountAmount:'',}