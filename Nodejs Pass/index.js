const fs = require('fs');
const express = require('express');

const port = 3000;
const app = express();
app.use(express.json());

function jsonReader(filePath, cb) {
    fs.readFile(filePath, 'utf-8', (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch (err) {
            return cb && cb(err);
        }
    });
}

app.get('/orders', async (req, res) => {
    jsonReader('./data/orders.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {

            // => "This String For Show Testing In Console Log"     // Important
            Total_Price_For_All_The_Orders_After_Discount = 0;
            for (let count_order = 0; count_order < data.orders.length; count_order++){
                console.log(data.orders[count_order].customer);
                console.log(data.orders[count_order].address.latitude , data.orders[count_order].address.longitude);
                console.log(data.orders[count_order].items.length);
                for (let count_item = 0; count_item < data.orders[count_order].items.length; count_item++) {
                    console.log(data.orders[count_order].items[count_item].name, 
                                data.orders[count_order].items[count_item].count, 
                                data.orders[count_order].items[count_item].price, 
                                data.orders[count_order].items[count_item].total
                                );
                }
                console.log(data.orders[count_order].total,
                            data.orders[count_order].discount,
                            data.orders[count_order].totalAfterDiscount
                            );
                Total_Price_For_All_The_Orders_After_Discount += data.orders[count_order].totalAfterDiscount
                if(count_order + 1 < data.orders.length){
                    console.log(',');
                }
            }
            console.log("\nTotal_Price_For_All_The_Orders_After_Discount:" , Total_Price_For_All_The_Orders_After_Discount);


            // => "This String For Show Testing As Browser Testing in Postman"     // Not Important 
            Total_Price_For_All_The_Orders_After_Discount = 0;
            string_web = "";
            for (let count_order = 0; count_order < data.orders.length; count_order++){
                string_web +=data.orders[count_order].customer;
                string_web +=("\n");
                string_web +=data.orders[count_order].address.latitude; string_web +=" "; string_web +=data.orders[count_order].address.longitude;
                string_web +=("\n");
                string_web +=data.orders[count_order].items.length;
                string_web +=("\n");
                for (let count_item = 0; count_item < data.orders[count_order].items.length; count_item++) {
                    string_web +=data.orders[count_order].items[count_item].name; string_web +=" ";
                    string_web +=data.orders[count_order].items[count_item].count; string_web +=" ";
                    string_web +=data.orders[count_order].items[count_item].price; string_web +=" ";
                    string_web +=data.orders[count_order].items[count_item].total; string_web +="\n";
                }
                string_web +=data.orders[count_order].total; string_web +=" ";
                string_web +=data.orders[count_order].discount; string_web +=" ";
                string_web +=data.orders[count_order].totalAfterDiscount; string_web +=" ";
                Total_Price_For_All_The_Orders_After_Discount += data.orders[count_order].totalAfterDiscount
                if(count_order + 1 < data.orders.length){
                    string_web +="\n,\n";
                }
            }
            string_web +="\n\n Total_Price_For_All_The_Orders_After_Discount:"; string_web +=Total_Price_For_All_The_Orders_After_Discount;
            res.send(string_web);

        }
    })
});

app.listen(port, () => console.log(`API Server is running ... listening on port ${port}!\n`));
