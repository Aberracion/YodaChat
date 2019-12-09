function ajax(type, url, headers, data, dataType){
  return new Promise((resolve, reject) => {
      $.ajax({
       type:type,
       url: url,
       headers: headers,
       data:data,
       dataType: dataType,
       contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
       success:function(data){
         resolve(data);
       },
       error:function(error){
         reject(error);
      }
    });
  });
}
