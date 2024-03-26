import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../components/global/layout';
import './style.scss';
import SelectDropdown from "../../components/common/SelectDropdown"
import ApiClient from '../../methods/api/apiClient';
import datepipeModel from '../../models/datepipemodel';
import ReactECharts from 'echarts-for-react';
import DateRangePicker from '../../components/common/DateRangePicker';
import LineChart from '../../components/common/LineChart';
import pipeModel from "../../models/pipeModel";
const Dashboard = () => {
  const user = useSelector((state:any) => state.user);
  const [filters, setFilter] = useState({ startDate: '', endDate: '', compare: '' })
  const [activeSubscriptions, setActiveSubscriptions] = useState([])
  const [newSubsctiptions, setNewSubsctiptions] = useState([])
  const [chartData, setChartData]:any = useState({ netRevenue: [], recurringRevenue: [], customers: [] })

  const getData = (p = {}) => {
    let f = {
      ...filters,
      ...p,
      type: 'monthly'
    }
    ApiClient.get('api/admin/dashboard', f).then(res => {
      if (res.success) {
        const mapF = (itm:any) => {
          return {
            ...itm,
            date: `${datepipeModel.monthfind(itm.month - 1)}/${itm.year}`
          }
        }

        const sortF = (a:any, b:any) => {
          if (a.month + a.year < b.month + b.year) //sort string ascending
            return -1;
          if (a.month + a.year > b.month + b.year)
            return 1;
          return 0; //default return value (no sorting)
        }

        let activeSubscriptions = res.activeSubscriptions.map(mapF).sort(sortF)
        let newSubsctiptions = res.newSubsctiptions.map(mapF).sort(sortF)
        res.netRevenue = res.netRevenue.map(mapF).sort(sortF)
        res.recurringRevenue = res.recurringRevenue.map(mapF).sort(sortF)
        res.activeCustomers = res.activeCustomers.map(mapF).sort(sortF)
        res.reActiveCustomers = res.reActiveCustomers.map(mapF).sort(sortF)
        res.newCustomer = res.newCustomer.map(mapF).sort(sortF)


        let barrAll:any = [
          ...res.activeCustomers,
          ...res.reActiveCustomers,
          ...res.newCustomer
        ].sort(sortF)

        barrAll = [...new Set([
          ...barrAll.map((itm:any) => itm.date),
        ])]

        barrAll = barrAll.map((itm:any) => {
          return {
            date: itm,
            newUsers: res.newCustomer.find((sitm:any) => sitm.date == itm)?.newUsers || 0,
            activecustomers: res.activeCustomers.find((sitm:any) => sitm.date == itm)?.activecustomers || 0,
            reActiveCustomers: res.reActiveCustomers.find((sitm:any) => sitm.date == itm)?.activecustomers || 0,
          }
        })

        console.log("barrAll", barrAll)

        res.customers = barrAll
        setActiveSubscriptions(activeSubscriptions)
        setNewSubsctiptions(newSubsctiptions)
        setChartData(res)
      }
    })
  }

  const filter = (p = {}) => {
    setFilter({ ...filters, ...p })
    getData(p)
  }

  const blockDateChange = (e:any) => {
    console.log("e", e)
    filter({
      endDate: datepipeModel.datetostring(e.endDate),
      startDate: datepipeModel.datetostring(e.startDate),
    })
  }

  useEffect(() => {
    // getData()
  }, [])

  return (
    <Layout>

      <div className='main_dashboard'>
        <div className='flex items-center justify-between mb-4 md:mb-8 lg:mb-12'>
          <div className='text-2xl font-semibold text-[#3C3E49]'>Dashboard</div>
          <div>
            <DateRangePicker
              value={filters.startDate ? { startDate: new Date(filters.startDate), endDate: new Date(filters.endDate) } : { startDate: '', endDate: '' }}
  
              onChange={(e:any) => blockDateChange(e)}
            />
          </div>
        </div>

        <div className='row_charts'>
          <div className='grid grid-cols-12'>
            <div className='col-span-12 md:col-span-6 mr-2 mb-3'>
              <div className='layout_new'>

                <div className=''>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Monthly Recurring Revenue</h2>
                  <h4 className=' text-2xl font-extrabold	mb-2 text-gray-700'>{pipeModel.currency(chartData?.totalrecurringRevenue)}</h4>

                  <div className='right_layout'>
                    {/* <h3><span class="material-icons green_icon">north_east</span>2.9%</h3>
                    <p className='text_light'>In Selected Period</p> */}
                  </div>
                </div>

                <LineChart
                  legends={[{ label: 'Monthly Recurring Revenue', key: 'totalactiveUserSubscriptions' }]}
                  data={chartData.recurringRevenue}
                  hideLegends={true}
                />
              </div>

            </div>
            <div className='col-span-12 md:col-span-6 ml-2 mb-3'>
              <div className='layout_new'>
                <div className=''>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Net Revenue</h2>
                  <h4 className=' text-2xl font-extrabold	mb-2 text-gray-700'>  {pipeModel.currency(chartData?.totalnetRevenue)}</h4>

                  <div className='right_layout'>
                    {/* <h3><span class="material-icons red_icon">south_east</span>19.9%</h3>
                    <p className='text_light'>In Selected Period</p> */}
                  </div>
                </div>
                <LineChart
                  legends={[{ label: 'Net Revenue', key: 'netRevenue' }]}
                  data={chartData.netRevenue}
                  hideLegends={true}
                />
              </div>
            </div>
            <div className='col-span-12 md:col-span-8 mr-2 mb-3'>
              <div className='layout_new'>
                <div className='layout_header mb-3'>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Monthly Recurring Revenue Growth</h2>
                  {/* <div class="dropdown">
                    <button class="btn btn_dropdown dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                      12 Months
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div> */}
                </div>
                <LineChart
                  legends={[{ label: 'Monthly Recurring Revenue', key: 'totalactiveUserSubscriptions' }]}
                  data={chartData.recurringRevenue}
                  hideLegends={true}
                />
              </div>
            </div>
            <div className='col-span-12 md:col-span-4 ml-2 mb-3 '>
              <div className='layout_new h-full'>
                <div className='layout_header mb-3'>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Breakdown</h2>
                  {/* <div class="dropdown">
                    <button class="btn btn_dropdown dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                      Everything
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div> */}
                </div>
                <div className='row_data'>
                  <div className='border_row'>
                    <div className='number_datarow'>
                      <div>
                        <span className='number_text'>{pipeModel.number(chartData?.newTrialsCount)}</span>
                        <span className='text_data'>New Trials</span>
                      </div>
                      <span className=''></span>
                    </div>
                  </div>
                  <div className='border_row'>
                    <div className='number_datarow'>
                      <div>
                        <span className='number_text'>{pipeModel.number(chartData?.newCustomerCount)}</span>
                        <span className='text_data'>New Customers</span>
                      </div>
                      <span className=''></span>
                    </div>
                  </div>
                  <div className='border_row'>
                    <div className='number_datarow'>
                      <div>
                        <span className='number_text'>{pipeModel.number(chartData?.totalactiveCustomers)}</span>
                        <span className='text_data'>Active Customers</span>
                      </div>
                      <span className=''></span>
                    </div>
                  </div>
                  <div className='border_row'>
                    <div className='number_datarow'>
                      <div>
                        <span className='number_text'>{pipeModel.number(chartData?.totalReactiveCustomers)}</span>
                        <span className='text_data'>Reactive Customers</span>
                      </div>
                      <span className=''></span>
                    </div>
                  </div>
                  {/* <div className='number_datarow number_datarow2'>
                    <div>
                      <span className='text_data'>Total change</span>
                    </div>
                    <span className='green_data'>+ $109.50</span>
                  </div> */}


                </div>
              </div>

            </div>
            <div className='col-span-12 md:col-span-4 mr-2 mb-3'>
              <div className='layout_new'>

                <div className=''>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Monthly Recurring Revenue Growth</h2>
                  <h4 className=' text-2xl font-extrabold	mb-2 text-gray-700'> {pipeModel.currency(chartData?.totalrecurringRevenue)}</h4>

                  <div className='right_layout'>
                    {/* <h3><span class="material-icons green_icon">north_east</span>2.9%</h3>
                    <p className='text_light'>In Selected Period</p> */}
                  </div>
                </div>
                <LineChart
                  legends={[{ label: 'Monthly Recurring Revenue', key: 'totalactiveUserSubscriptions' }]}
                  data={chartData.recurringRevenue}
                  hideLegends={true}
                />
              </div>
            </div>
            <div className='col-span-12 md:col-span-8 ml-2 mb-3'>
              <div className='layout_new h-full'>
                <div className='layout_header mb-3'>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Customer Overview</h2>
                  {/* <div class="dropdown">
                    <button class="btn btn_dropdown dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                      Days
                    </button>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Action</a>
                      <a class="dropdown-item" href="#">Another action</a>
                      <a class="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div> */}
                </div>
                <div className='row'>
                  <div className='col-md-3'>
                    <div>
                      <div className='left_ser'>
                        <i className="fa fa-circle circle1" aria-hidden="true"></i>
                        <div>
                          <p>New Customer</p>
                          <h3>{pipeModel.number(chartData?.newCustomerCount)}</h3>
                        </div>
                      </div>
                      <div className='left_ser'>
                        <i className="fa fa-circle circle2" aria-hidden="true"></i>
                        <div>
                          <p>Active Customer</p>
                          <h3>{pipeModel.number(chartData?.totalactiveCustomers)}</h3>
                        </div>
                      </div>
                      <div className='left_ser'>
                        <i className="fa fa-circle circle3" aria-hidden="true"></i>
                        <div>
                          <p>Reactive Customer</p>
                          <h3>{pipeModel.number(chartData?.totalReactiveCustomers)}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-9'>
                    <LineChart
                      legends={[
                        { label: 'New Customer', key: 'newUsers' },
                        { label: 'Active Customer', key: 'activecustomers' },
                        { label: 'Reactive Customer', key: 'reActiveCustomers' },
                      ]}
                      data={chartData?.customers}
                      hideLegends={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-12 md:col-span-6 mb-3 mr-2'>
              <div className='layout_new'>
                <div className=''>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>New Subscriptions</h2>
                  <h4 className=' text-2xl font-extrabold	mb-2 text-gray-700'>{pipeModel.currency(chartData?.totalNewSubscription)}</h4>
                  <div className='right_layout'>
                    {/* <h3><span class="material-icons red_icon">south_east</span>19.9%</h3>
                    <p className='text_light'>In Selected Period</p> */}
                  </div>
                </div>
                <LineChart
                  legends={[{ label: 'New Subscriptions', key: 'newSubscriptions' }]}
                  data={newSubsctiptions}
                  hideLegends={true}
                />
              </div>
            </div>
            <div className='col-span-12 md:col-span-6 mb-3 ml-2'>
              <div className='layout_new'>
                <div className=''>
                  <h2 className='text-typo text-md font-semibold mb-2 text-gray-500'>Active Subscriptions</h2>
                  <h4 className=' text-2xl font-extrabold	mb-2 text-gray-700'>{pipeModel.currency(chartData?.totalActiveSubscription)}</h4>
                  <div className='right_layout'>
                    {/* <h3><span class="material-icons green_icon">north_east</span>2.9%</h3>
                    <p className='text_light'>In Selected Period</p> */}
                  </div>
                </div>
                <LineChart
                  legends={[{ label: 'Active Subscriptions', key: 'totalactiveUserSubscriptions' }]}
                  data={activeSubscriptions}
                  hideLegends={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;