		
		var avail_Books_Count=0;
		
		
		// ページが読み込まれたときに実行される関数
        window.onload = function() {
			
			if ($("#book_Data_List").val() != "1") //1の時は選択画面から、1出ないときは戻りボタンから画面遷移したとき
            {
                const data = JSON.parse($("#book_Data_List").val()); // JSONデータを変換する
                for (let i = 0; i < data.length; i++) {
                    RECE_DATA_RET(data[i]);//戻りボタン押下時のlist追加処理
                }
            }
            RE_TBL();
			
        };
        
        
        // windowオブジェクトを変数に格納
        function display() {
			
			var book_Number = $("#book_Number").val();
    		var book_Name = $("#book_Name").val();
    		var genre_Name = $("#genre_Name").val();
			$.ajax({
				url:"http://localhost:8080/SRCH_LIST",
				type: "POST",
				contentType: "application/json; charset=utf-8", 
				data:JSON.stringify({
				scrn_Var:{book_Number:book_Number,book_Name:book_Name,genre_Name:genre_Name},
				}) 
			}).done(function(list){
			const books_Text = list
                .map((book) => {
                    return `${book.book_Name},${book.book_Number},${book.book_Number_Branch},${book.genre_Name},${book.genre_Number}`;
                })
                .join(", ");
				$("#list").val(books_Text);
			})
            var obj_window = window.open("CHILD_SCRN", "name", 'width=550,height=1000');
        }
        
       
        

        
		
		var avail_Books_Count=0;
		
		
		// ページが読み込まれたときに実行される関数
        window.onload = function() {
			
			if ($("#book_Data_List").val() != "1") //1の時は選択画面から、1出ないときは戻りボタンから画面遷移したとき
            {
                const data = JSON.parse($("#book_Data_List").val()); // JSONデータを変換する
                for (let i = 0; i < data.length; i++) {
                    RECE_DATA_RET(data[i]);//戻りボタン押下時のlist追加処理
                }
            }
            RE_TBL();
			
        };
		
		
		// ページの読み込み完了時に実行される
        $(function() {
			CHK_AVAIL(AFT_CHK_AVAIL);
			// 書籍名入力欄の値が変更されたかチェック
            $("#book_Name").on("input", function() {
               CHK_IN();
            });
            
            // 書籍番号入力欄の値が変更されたかチェック
            $("#book_Number").on("input", function() {
                NUM_DIG_CHK(CHK_IN);
                NUM_FORM_CHK(CHK_IN);
            });
            
        });
        
        // ボタンクリック時にボタンのidのURLへ画面遷移
        function CHG(id) {
            document.No.action = id;
            document.No.submit();
        }
        const max_Row_Count = 5; // 表示する行数
        var books = [];//書籍情報保持配列

        // 新しい書籍情報を追加する関数
        function ADD_BOOK(book_Data) {
			//書籍の数が最大貸出冊数-既に貸出している数より小さいときのみ借りれる
            if (books.length < max_Row_Count - avail_Books_Count) {
                if (!EXIST_CHK(book_Data)) {//重複チェックの結果がfalseの時のみ借りることができる
                    books.push(book_Data); // 配列booksに新しい書籍情報を追加
                }
                RE_TBL(); // テーブル更新
            }
            CHK_LEND_BTN(); // 登録ボタンの状態を更新
        }
        
        // 既に同じ書籍が存在するかチェック
        function EXIST_CHK(book) {
			return books.some((exist_Book) => {
				return (
					exist_Book.name === book.name &&
                    exist_Book.number === book.number &&
                    exist_Book.number_Branch === book.number_Branch &&
                    exist_Book.genre_Name === book.genre_Name &&
                    exist_Book.genre_Number === book.genre_Number
                );
            });
        }
        
        
        // 登録ボタンの状態チェック
        function CHK_LEND_BTN() {
            const remaining_Books = max_Row_Count - avail_Books_Count - books.length;
            if (remaining_Books > 0) {
                $("#remaining_Books").text(remaining_Books); // 残り冊数を表示
            }
            else
            {
				$("#remaining_Books").text(0);//残り貸出冊数が0冊
				$("#card_Number").css("background-color", "red");
                elem = "<font color=red> ";
                elem += "<li>" + "貸出冊数の上限に達しました　これ以上貸出ができません" + "</li>";
                elem += "</font>";
                $("#LEND_FUNC_EM").html(elem);
			}

            if (books.length > 0) {
                $("#LEND_FUNC_CONFI").prop("disabled", false); // 活性化
            } else {
                $("#LEND_FUNC_CONFI").prop("disabled", true); // 非活性化
            }
            
            //取り消しボタンの活性化の数を定める
            $(".cancel-button").prop("disabled", (index) => index >= max_Row_Count - avail_Books_Count);
        }

        // 書籍情報を削除する関数
        function REMOVE_BOOK(index) {
            books.splice(index, 1); // 選択した書籍情報を配列から削除します
            CHK_LEND_BTN(); // 登録ボタンの状態を更新
            RE_TBL(); // テーブルを更新して削除を反映
        }

        // テーブルを更新する関数
        function RE_TBL() {
            const book_Table = $("#book_Table")[0];
            const tbody = book_Table.querySelector("tbody");

            // books配列から書籍情報をまとめてテキストに変換
            const books_Text = books
                .map((book) => {
                    return `${book.name},${book.number},${book.number_Branch},${book.genre_Name},${book.genre_Number}`;
                })
                .join(", ");

            // booksの情報をテキストボックスに表示
            $("#list_Send").val(books_Text);
            $("#avail_Send").val(avail_Books_Count);

            // テーブルの内容をクリア
            tbody.innerHTML = "";

            // 書籍情報を再表示します
            for (let i = 0; i < max_Row_Count; i++) {
                const book = books[i];
                const row = tbody.insertRow();
                row.insertCell(0).innerText = book ? book.name : "";
                row.insertCell(1).innerText = book ? book.number : "";
                row.insertCell(2).innerText = book ? book.number_Branch : "";
                row.insertCell(3).innerText = book ? book.genre_Name : "";
                row.insertCell(4).innerText = book ? book.genre_Number : "";
                //bookに情報がある時は取り出し、ない場合は""を挿入する

                if (book) {
                    const cancel_Button = document.createElement("button");
                    cancel_Button.innerText = "取り消し";
                    cancel_Button.classList.add("cancel-button");
                    cancel_Button.disabled = i >= (max_Row_Count - avail_Books_Count); // ボタンを非活性化
                    cancel_Button.addEventListener("click", function() {
                        REMOVE_BOOK(i);
                    });
                    
                    // 既に借りている書籍数に応じて表の背景色を設定
            		const tbody = document.querySelector("#book_Table tbody");
            		const rows = tbody.getElementsByTagName("tr");

            		for (let i = 0; i < rows.length; i++) {
                		if (i < (max_Row_Count - avail_Books_Count)) {
                   			rows[i].style.backgroundColor = "white";
                		} else {
                    		rows[i].style.backgroundColor = "#909090";
                		}		
            		}
                    row.insertCell(5).appendChild(cancel_Button);
                    
                } else {
                    const cancel_Button = document.createElement("button");
                    cancel_Button.innerText = "取り消し";
                    cancel_Button.disabled = i >= (max_Row_Count - avail_Books_Count); // ボタンを非活性化
                    cancel_Button.classList.add("cancel-button"); // 簡単な選択のためにクラスを追加
                    cancel_Button.addEventListener("click", function() {
                        REMOVE_BOOK(i);
                    });
                    
                    // 既に借りている書籍数に応じて表の背景色を設定
         			const tbody = document.querySelector("#book_Table tbody");
            		const rows = tbody.getElementsByTagName("tr");

            		for (let i = 0; i < rows.length; i++) {
                		if (i < (max_Row_Count - avail_Books_Count)) {
                    		rows[i].style.backgroundColor = "white";
                		} else {
                    		rows[i].style.backgroundColor = "#909090";
                		}
            		}
                    row.insertCell(5).appendChild(cancel_Button);
                }
            }
        }
        
        // windowオブジェクトを変数に格納
        function disp() {
			
			var book_Number = $("#book_Number").val();
    		var book_Name = $("#book_Name").val();
    		var genre_Name = $("#genre_Name").val();
			$.ajax({
				url:"http://localhost:8080/SRCH_LIST",
				type: "POST",
				contentType: "application/json; charset=utf-8", 
				data:JSON.stringify({
				scrn_Var:{book_Number:book_Number,book_Name:book_Name,genre_Name:genre_Name},
				}) 
			}).done(function(list){
			const books_Text = list
                .map((book) => {
                    return `${book.book_Name},${book.book_Number},${book.book_Number_Branch},${book.genre_Name},${book.genre_Number}`;
                })
                .join(", ");
				$("#list").val(books_Text);
			})
            var obj_window = window.open("CHILD_SCRN", "name", 'width=550,height=1000');
        }
         //検索ボタンの活性、非活性の制御
        function NUM_DIG_CHK(chk_In) {

                    var book_Number = $("#book_Number").val();

            $.ajax({
                url:"http://localhost:8080/NUM_DIG_CHK",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    scrn_Var: {book_Number : book_Number},
                })
            }).done(function(num_Dig_Result) {
                var elem = "";

                if (num_Dig_Result == true) //桁数が合っている場合
                {
                    $("#card_Number").css("background-color", "white");
                    elem = "";
                    $("#NUM_DIG_EM").html(elem);
                    flag_CN = true;
                } 
                else if (num_Dig_Result == false) //桁数が間違っている場合
                {
                    $("#card_Number").css("background-color", "red");
                    elem = "<font color=red> ";
                    elem += "<li>" + "書籍番号の桁数は13桁以内で入力してください。" + "</li>";
                    elem += "</font>";
                    $("#NUM_DIG_EM").html(elem);
                    flag_CN = false;
                }

				chk_In();

            }).fail(function() {
                console.log("fail");
            });
        }
        
                //検索ボタンの活性、非活性の制御
        function NUM_FORM_CHK(chk_In) {

                    var book_Number = $("#book_Number").val();

            $.ajax({
                url:"http://localhost:8080/NUM_FORM_CHK",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    scrn_Var: {book_Number : book_Number},
                })
            }).done(function(num_Form_Result) {
                var elem = "";

                if (num_Form_Result == true) //桁数が合っている場合
                {
                    $("#book_Number").css("background-color", "white");
                    $("#NUM_FORM_EM").html(elem);
                    flag_CN = true;
                } 
                else if (num_Form_Result == false) //桁数が間違っている場合
                {
                    $("#book_Number").css("background-color", "red");
                    elem = "<font color=red> ";
                    elem += "<li>" + "書籍番号は半角数字で入力して下さい。" + "</li>";
                    elem += "</font>";
                    $("#NUM_FORM_EM").html(elem);
                    flag_CN = false;
                }

				chk_In();

            }).fail(function() {
                console.log("fail");
            });
        }
        
        
        
        //残り貸出冊数チェック
        function CHK_AVAIL(callback) {
			var card_Number = $("#card_Number").val();
			 $.ajax({
				 url: "http://localhost:8080/CHK_AVAIL",
        		type: "POST",
        		contentType: "application/json; charset=utf-8",
        		data: JSON.stringify({
            		scrn_Var: { card_Number: card_Number },
        		}),
    		}).done(function (avail_Books) {
        		avail_Books_Count = avail_Books;
        		callback();
    		}).fail(function () {
       			 console.log("fail");
    		});
		}
		
		