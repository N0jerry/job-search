import { type Order } from './type.ts';

export function printOrder(order: Order) {
        var iframe = document.createElement('iframe');
        // iframe.style.display = 'none';
        document.body.append(iframe);
            iframe.contentDocument!.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <body>
                ${
                    order.details.map((item) => {
                        return `
                        ${item.food.name} - ${item.amount} - ${item.food.price}
                        `
                    })
                }            
                    
                </body>
                </html>
                `)
            iframe.contentDocument!.close()
            iframe.contentWindow!.print()
            setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 500)

}