import { RequestHandler } from 'express';
import catchAsync from '../../utility/catchAsync';
import sevice_info_items_services from './device_info_items.services';
import sendRespone from '../../utility/sendRespone';
import httpStatus from 'http-status';

const recorded_device_info_items: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await sevice_info_items_services.recorded_device_info_items_IntoDb(
        req.body,
      );

    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Recorderd Device Info Items',
      data: result,
    });
  },
);

const findByAlldeviceinfoitems: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await sevice_info_items_services.findByAlldeviceinfoitemsIntoDb(
        req.query,
      );
    sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Find By All Device Information Items',
      data: result,
    });
  },
);


const delete_deviceinfoitems:RequestHandler=catchAsync(async(req , res)=>{

    const result=await sevice_info_items_services.delete_deviceinfoitems_IntoDb(req.params.id);
     sendRespone(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Successfully Delete',
      data: result,
    });
})

const sevice_info_items_controller = {
  recorded_device_info_items,
  findByAlldeviceinfoitems,
   delete_deviceinfoitems
};

export default sevice_info_items_controller;
