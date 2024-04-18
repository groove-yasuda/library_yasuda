package com.example.demo;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedCaseInsensitiveMap;

@Controller
public class library_Model {
	private JdbcTemplate jdbcTemplate;
	
	
	////図書カード番号の存在チェック
	//引数:libraryNumber … 入力された図書カード番号
	//戻り値:result … 組み合わせチェックの結果件数
	public int  existenceCheck(int libraryNumber) 
	{
		//変数宣言
		envFile e = new envFile();
		jdbcTemplate = e.jdbcTemplate();

		//組み合わせチェックの呼び出し
		List<?> check = jdbcTemplate.queryForList("SELECT COUNT(*) "
				+ "FROM user_mst "
				+ "where library_number = ? "
				,libraryNumber);
		LinkedCaseInsensitiveMap<?> list = (LinkedCaseInsensitiveMap<?>) check.get(0);
		int result = Integer.parseInt(list.get("COUNT(*)").toString());

		return result;
	}
	
	////利用者情報の検索
	//引数:libraryNumber … 入力された図書カード番号
	//戻り値:judge … 利用者情報の検索結果
	public List<?>  userSearch(int libraryNumber) 
	{
		//変数宣言
		envFile e = new envFile();
		jdbcTemplate = e.jdbcTemplate();
		//組み合わせチェックの呼び出し
		List<?> check = jdbcTemplate.queryForList("SELECT * "
				+ "FROM user_mst "
				+ "where library_number = ? "
				,libraryNumber);

		return check;
	}
	
	////利用者情報の更新
	//引数:libraryNumber … 入力された図書カード番号
	public void  userUpdate(int libraryNumber,String userNameOver,String phoneNumberOver,
			int prefectureIdOver,String municipalitiesOver,String streetAddressOver,
			String apartmentOver) 
	{
		//変数宣言
		envFile e = new envFile();
		jdbcTemplate = e.jdbcTemplate();
		
		 System.out.println("OK");
		//更新処理SQLの実行
		 jdbcTemplate.update("UPDATE user_mst SET user_Name = ?, phone_number = ?, "
			        + "prefecture_id = ?, city = ?, block = ?, building = ? "
			        + "WHERE library_number = ?", userNameOver, phoneNumberOver,
			        prefectureIdOver, municipalitiesOver, streetAddressOver,
			        apartmentOver, libraryNumber);

	}
	
	////利用者情報の削除
	//引数:libraryNumber … 入力された図書カード番号
	public void  userDelete(int libraryNumber) 
	{
		//変数宣言
		envFile e = new envFile();
		jdbcTemplate = e.jdbcTemplate();
		
		 System.out.println("OK");
		//削除処理SQLの実行
		jdbcTemplate.update("DELETE FROM user_mst WHERE library_number = ?",
					libraryNumber);

	}
	
	////住所の検索
	//引数:postCode … 入力された郵便番号
	//戻り値:response.toString(); … 住所の検索結果
	public String postSearch(int postCode) throws IOException {
	    int zipCode = postCode; // 検索したい郵便番号

	    // APIのURLを構築
	    String apiUrl = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + zipCode;

	    // URLオブジェクトを作成
	    URL url = new URL(apiUrl);

	    // HttpURLConnectionを作成してリクエストを送信
	    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	    connection.setRequestMethod("GET");

	    // レスポンスを受け取る
	    int responseCode = connection.getResponseCode();
	    if (responseCode == HttpURLConnection.HTTP_OK) {
	        // レスポンスを読み取り
	        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
	        String inputLine;
	        StringBuffer response = new StringBuffer();
	        while ((inputLine = in.readLine()) != null) {
	            response.append(inputLine);
	        }
	        in.close();

	        // レスポンスをString形式で返却
	        return response.toString();
	    } else {
	        System.out.println("HTTPリクエストが失敗しました。ステータスコード: " + responseCode);
	        return null;
	    }
	}
	
	
	////利用者情報の検索
	//引数:libraryNumber … 入力された図書カード番号
	//戻り値:judge … 利用者情報の検索結果
	public List<?>  getPrefecture() 
	{
		//変数宣言
		envFile e = new envFile();
		jdbcTemplate = e.jdbcTemplate();
		//組み合わせチェックの呼び出し
		List<?> check = jdbcTemplate.queryForList("SELECT * "
				+ "FROM prefecture_mst ");
		
		return check;
	}
	
	

}