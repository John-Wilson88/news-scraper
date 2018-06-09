// scrape "on" click function, and ajax request.

// delete "on" click function, and ajax request, deletes an article from the database.

$(".delete").on("click", () => {
	
	let artID = $(this).attr("data_id");

	$.ajax({
		method: "DELETE",
		url: "/article/" + artID,
		data: "json"
	}).then((data) => {
		console.log("article Deleted");
	});

});