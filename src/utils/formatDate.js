export function formateTime(timestamp) {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to the month since January is 0
    const year = date.getFullYear();
    const hours = (date.getHours() % 12).toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    
    const formattedDate = ` ${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
    

  return formattedDate;
}
